import os
import urllib.parse
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from typing import Any

try:
    from django.conf import settings

    def _get_setting(key: str, default: str) -> str:
        if settings.configured:
            return getattr(settings, key, os.getenv(key, default))
        return os.getenv(key, default)
except ImportError:

    def _get_setting(key: str, default: str) -> str:
        return os.getenv(key, default)


VN_TZ = timezone(timedelta(hours=7))


def crc16_ccitt(data: str) -> str:
    """
    Computes standard CRC16-CCITT (poly 0x1021, init 0xFFFF) for EMVCo QR code.
    Returns 4-character uppercase hexadecimal string.
    """
    crc = 0xFFFF
    for byte in data.encode("utf-8"):
        crc ^= byte << 8
        for _ in range(8):
            crc = ((crc << 1) ^ 0x1021) & 0xFFFF if (crc & 0x8000) else (crc << 1) & 0xFFFF
    return f"{crc:04X}"


def tlv(tag: str, val: str) -> str:
    """Formats EMVCo Tag-Length-Value."""
    return f"{tag}{len(val):02d}{val}"


class VietQRAdapter:
    """
    VietQR Payment Gateway Adapter implementing NAPAS 247 QuickLink & EMVCo QR specifications.
    Generates standard bank transfer QR payload without external dependencies.
    """

    def __init__(
        self,
        bank_bin: str | None = None,
        bank_name: str | None = None,
        account_number: str | None = None,
        account_name: str | None = None,
        template: str | None = None,
    ):
        self.bank_bin = bank_bin or _get_setting("VIETQR_BANK_BIN", "970422")
        self.bank_name = bank_name or _get_setting("VIETQR_BANK_NAME", "MBBank")
        self.account_number = account_number or _get_setting("VIETQR_ACCOUNT_NO", "0987654321")
        self.account_name = account_name or _get_setting(
            "VIETQR_ACCOUNT_NAME", "CONG TY TNHH STAR TRAVELS VIET NAM"
        )
        self.template = template or _get_setting("VIETQR_TEMPLATE", "compact2")

    def build_emvco_payload(self, booking_code: str, amount: int) -> str:
        """
        Builds standard EMVCo / NAPAS 247 dynamic QR string with CRC16-CCITT checksum.
        """
        # Tag 38: Consumer Account Information (NAPAS)
        sub_bank = tlv("00", self.bank_bin) + tlv("01", self.account_number)
        tag_38_val = tlv("00", "A000000727") + tlv("01", sub_bank) + tlv("02", "QRIBFTTA")
        tag_38 = tlv("38", tag_38_val)

        # Tag 62: Additional Data (Purpose of Transaction / Booking Reference)
        tag_62 = tlv("62", tlv("08", booking_code))

        raw = (
            tlv("00", "01")  # Payload Format Indicator
            + tlv("01", "12")  # Point of Initiation: 12 (Dynamic with amount)
            + tag_38  # Merchant Account Info
            + tlv("53", "704")  # Currency Code: 704 (VND)
            + tlv("54", str(amount))  # Transaction Amount
            + tlv("58", "VN")  # Country Code
            + tag_62  # Additional Data Field
            + "6304"  # CRC Tag and Length placeholder
        )
        crc = crc16_ccitt(raw)
        return raw + crc

    def generate_qr_payload(
        self,
        txn_ref: str,
        booking_code: str,
        amount: int | float | Decimal,
        expires_minutes: int = 15,
        created_at: datetime | None = None,
    ) -> dict[str, Any]:
        """
        Generates complete VietQR payload including quicklink image URL, pure EMVCo string,
        and fallback bank account transfer details.
        """
        now = created_at or datetime.now(VN_TZ)
        if now.tzinfo is None:
            now = now.replace(tzinfo=VN_TZ)
        expires_at = now + timedelta(minutes=expires_minutes)

        int_amount = int(round(float(amount)))

        # Clean transfer content: MUST be exact booking_code
        transfer_content = booking_code.strip()

        # VietQR QuickLink image URL
        encoded_content = urllib.parse.quote_plus(transfer_content)
        encoded_acc_name = urllib.parse.quote_plus(self.account_name)
        quicklink_url = (
            f"https://img.vietqr.io/image/{self.bank_bin}-{self.account_number}-{self.template}.png"
            f"?amount={int_amount}&addInfo={encoded_content}&accountName={encoded_acc_name}"
        )

        # Pure EMVCo payload
        emvco_payload = self.build_emvco_payload(transfer_content, int_amount)

        bank_info = {
            "bank_name": self.bank_name,
            "bank_bin": self.bank_bin,
            "account_number": self.account_number,
            "account_name": self.account_name,
            "amount": int_amount,
            "transfer_content": transfer_content,
        }

        return {
            "txn_ref": txn_ref,
            "booking_code": transfer_content,
            "amount": int_amount,
            "quicklink_url": quicklink_url,
            "emvco_payload": emvco_payload,
            "bank_info": bank_info,
            "expires_at": expires_at,
            "payload": {
                "gateway": "vietqr",
                "bank_bin": self.bank_bin,
                "account_number": self.account_number,
                "account_name": self.account_name,
                "amount": int_amount,
                "transfer_content": transfer_content,
                "emvco": emvco_payload,
            },
        }

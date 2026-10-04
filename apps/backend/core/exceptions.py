from rest_framework.views import exception_handler

def api_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is None:
        return None
    if isinstance(response.data, dict) and "detail" in response.data:
        response.data = {"error": {"code": getattr(exc, "default_code", "error"), "message": response.data["detail"]}}
    return response

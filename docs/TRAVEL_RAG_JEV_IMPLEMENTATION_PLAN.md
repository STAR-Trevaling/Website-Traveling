# STAR Travels — RAG + Jev: Repository-First Implementation Plan

> **Loại tài liệu:** Implementation brief + kế hoạch tác vụ cho AI coding agent  
> **Ngày soạn:** 2026-10-16  
> **Dự án:** Travel Discovery, Partner & Content Platform / STAR Travels  
> **Repository tham chiếu:** https://github.com/STAR-Trevaling/Website-Traveling  
> **Nguyên tắc:** Extend the working system. Do not rebuild it. No speculative architecture.

## 0. LỆNH THỰC THI CHO AI AGENT

Bạn là Senior Python/Django Engineer kiêm AI/RAG Engineer. Nhiệm vụ của bạn là **nâng cấp AI Concierge hiện tại thành hệ thống RAG có kiểm chứng và bổ sung Jev cho những quyết định phân tuyến thực sự cần thiết**, theo đúng kiến trúc repository.

**Không tạo một AI app/microservice, chatbot, database, hoặc frontend mới nếu repository đã có chức năng tương ứng.** Không bắt đầu sửa code trước khi hoàn thành Phase 0. Trong mỗi phase: inspect → làm một thay đổi nhỏ → viết/chạy test → review diff → cập nhật trạng thái. Không tuyên bố đã hoàn thành nếu chưa chạy kiểm thử.

- Đọc `AGENTS.md` **ở root trước tiên**, sau đó đọc sáu file trong `context/` theo đúng thứ tự `AGENTS.md` chỉ dẫn (`project-overview`, `architecture`, `ai-workflow-rules`, `code-standards`, `progress-tracker`, `ui-context`). Nếu repository đã đổi sang `project-context/context-manifest.yaml`, hãy tôn trọng manifest mới và giải thích sai khác; **không tạo cả hai hệ context song song**.
- Đọc `docs/ai-assistant-and-rag-spec.md`, tài liệu Odoo/CRM, các ADR, test liên quan và nguồn code đang chạy. **Tài liệu là ý định; source code, migrations và kết quả test mới xác định implementation status.**
- Đọc đúng các khu vực có liên quan: `apps/api/assistant/`, `apps/api/integrations/`, `destinations/`, `places/`, `tours/`, `content/`, `guides/`, `apps/public-site/`, `packages/contracts/`, requirements, Docker và CI. Những path này là **gợi ý dựa trên repo công khai**, xác nhận lại ở checkout hiện tại.
- Phân loại kết luận: `OBSERVED` (đã kiểm bằng code), `DECLARED` (yêu cầu/ADR), `INFERRED` (suy luận), `UNDECIDED` (chưa có căn cứ). Không gán nhãn `IMPLEMENTED` cho thứ chỉ nằm trong đặc tả.
- Theo `AGENTS.md`, dùng **Jev như conceptual skill router cho công việc coding**: lựa chọn đúng skills (Caveman, TDD, Superpowers, frontend skills khi thực sự cần), không gọi toàn bộ skills. Phần **Jev runtime trong sản phẩm** là tích hợp khác, được thiết kế tại Phase 3 dưới đây.
- Nếu gặp blocker thực sự (thiếu quyền, chưa có API/provider key, migration mất dữ liệu, quyết định ảnh hưởng production), dừng đúng phần bị chặn, ghi rõ và tiếp tục các tác vụ độc lập an toàn. Không giả lập external calls như thành công production.

### Câu trả lời bắt buộc sau Phase 0, trước khi sửa code

Tạo một báo cáo ngắn trong phản hồi agent (không cần sinh thêm nhiều file):

| Nội dung | Phải trình bày |
| --- | --- |
| Existing inventory | Chức năng đang có: code path, class/function, endpoint, DB table, test evidence |
| Gap list | Chức năng thiếu/lỗi, ảnh hưởng người dùng, mức ưu tiên P0/P1/P2 |
| Reuse vs change | Sẽ giữ nguyên/sửa/tạo thêm phần nào và **vì sao** |
| Data & security risk | Session ownership, lead consent, published content, migration, prompt injection |
| Minimal plan | Các thay đổi theo từng PR/task, thứ tự phụ thuộc, lệnh kiểm thử tương ứng |
| Unresolved decisions | Provider/model Jev, embedding model, credentials, môi trường chạy |

## 1. PRODUCT GOAL & OUT OF SCOPE

### Mục tiêu của phiên bản nâng cấp

1. Người dùng hỏi bằng tiếng Việt/Anh về điểm đến, tour, trải nghiệm, cẩm nang; nhận câu trả lời **grounded** từ dữ liệu STAR và nguồn được trỏ rõ.
2. Truy xuất đúng thực thể: dùng PostgreSQL/filter/PostGIS cho dữ liệu cấu trúc; retrieval theo từ khóa/ngữ nghĩa cho tri thức dài; không dùng LLM/embedding để tính giá, phân quyền hoặc kiểm tra trạng thái xuất bản.
3. Tư vấn lịch trình **gợi ý** theo số ngày, sở thích và ngân sách, chỉ dựa trên địa điểm/tour còn hợp lệ; không cam kết thời gian di chuyển/giá hoặc booking chưa được kiểm tra.
4. Jev runtime, **nếu được cấu hình và chứng minh hữu ích**, chỉ giúp chọn tuyến xử lý cho request mơ hồ; fallback an toàn về router hiện có. Jev không sinh câu trả lời, không viết tool arguments, không quyết định quyền truy cập.
5. Giữ nguyên contract chat hiện tại hoặc mở rộng tương thích; giữ cơ chế CRM lead sync hiện có nhưng **không phát sinh side effect chỉ vì AI đoán ý định hoặc phát hiện số điện thoại trong chat**.

### Ngoài phạm vi cho MVP này

- Không xây multi-agent swarm, autonomous booking, agent browsing toàn Internet, dynamic plugin registry, knowledge graph, GraphRAG, multi-vector databases, OpenSearch/Elastic, Pinecone/Qdrant, Kafka, Kubernetes, event sourcing, CQRS đầy đủ.
- Không viết lại Next.js UI, Odoo integration, partner approval, booking/payment hoặc RBAC. Không thêm LangGraph/CrewAI/LlamaIndex chỉ để có framework; dùng service Python hiện có là đủ khi workflow tuyến tính.
- Không tự thêm scraping diện rộng hoặc dự báo thời tiết/visa/giá realtime. Chỉ công bố độ mới dữ liệu có nguồn và timestamp.
- Không xây automatic model fallback qua nhà cung cấp khác nếu chưa có **quyền cấu hình rõ ràng**; không lưu secrets/PII trong prompt, logs hoặc vector không cần thiết.
- Chưa xây PDF itinerary, Zalo automation, voice assistant, personalized ML recommender hay semantic cache. Chỉ cân nhắc ở một task mới khi có bằng chứng nhu cầu.

## 2. REPO BASELINE & MẤU CHỐT PHẢI KIỂM TRA

**Quan sát tham chiếu từ repository GitHub công khai ngày 2026-10-16; không đồng nghĩa checkout/local environment đang giống hệt, không phải kết quả chạy test:**

| Thành phần | Quan sát từ public source | Hành động agent bắt buộc |
| --- | --- | --- |
| `AGENTS.md` | Jev đang là *conceptual skill router* cho coding agent | Giữ nguyên vai trò đó; tách Jev runtime khỏi skill workflow |
| `apps/api/assistant/models.py` | Đã có `AssistantConversation`, `AssistantMessage`, `AssistantLeadCapture`, `AssistantKnowledgeChunk` | Tái sử dụng, không tạo các model tương đương ở app `ai/` mới |
| `AssistantKnowledgeChunk.embedding` | Đang khai báo là `models.JSONField`, dù README/spec mô tả pgvector | Kiểm chứng implementation retrieval và migrations; không khẳng định đã có vector index thật |
| `apps/api/assistant/views.py` | `chat` gọi `services.retriever.search_knowledge` và `services.generator.generate_response`; trả tour/referral cards; có lead capture/outbox | Refactor tại đường xử lý này, không mở API chatbot thứ hai |
| Conversation access | ViewSet dùng `AllowAny`, có query theo `session_token` | Audit ownership/khả năng truy cập của phiên; fix P0 nếu lộ lịch sử chat |
| Lead workflow | Chat xử lý `extract_lead_info(message)` và có thể tạo lead/outbox theo thông tin liên hệ | Kiểm tra consent + idempotency + spam trước khi giữ/đổi hành vi |
| Odoo | Repo/tài liệu thiết kế integration/outbox với CRM và CMS | Giữ ranh giới Django ↔ Odoo bằng API/events; không truy cập DB chéo |
| Frontend | Đã có public site và AI assistant specification | Bảo toàn chat widget/contract; chỉ bổ sung UI hỗ trợ nguồn khi cần |

**Nguồn review code:**
- `https://github.com/STAR-Trevaling/Website-Traveling/blob/main/AGENTS.md`
- `https://github.com/STAR-Trevaling/Website-Traveling/blob/main/apps/api/assistant/models.py`
- `https://github.com/STAR-Trevaling/Website-Traveling/blob/main/apps/api/assistant/views.py`
- `https://github.com/STAR-Trevaling/Website-Traveling/blob/main/apps/api/assistant/services/retriever.py`
- `https://github.com/STAR-Trevaling/Website-Traveling/blob/main/apps/api/assistant/services/generator.py`
- `https://github.com/STAR-Trevaling/Website-Traveling/blob/main/docs/ai-assistant-and-rag-spec.md`

**Không coi các tuyên bố trong README như “production-ready”, “0% hallucination”, “all tests pass”, “pgvector enabled” là bằng chứng đủ.** Yêu cầu code/config, query plan và test mới xác nhận được.

## 3. KIẾN TRÚC ĐÍCH — MỞ RỘNG MODULE HIỆN CÓ

```text
Next.js existing AI Concierge UI
    |
    v
Existing Next.js BFF (if used) -> existing Django assistant chat endpoint
    |
    v
Auth/session ownership + limits + input validation
    |
    v
Thin chat service/orchestrator (within apps/api/assistant)
    |
    +--> Route: deterministic rule first; Jev Choice on ambiguous case (optional)
    |       -> whitelist route + code policy gate
    |
    +--> Knowledge route -> hybrid retriever -> ranked source references
    +--> Discovery route -> ORM filters/PostGIS + optional knowledge retrieval
    +--> Itinerary route -> eligible places/tours + deterministic constraints
    +--> Lead route -> explicit user confirmation/consent -> existing outbox
    |
    v
Existing LLM generator (approved provider) -> grounded text + structured cards
    |
    v
Validate citations/entity IDs/permissions -> existing response schema (+ additive sources)
    |
    v
Next.js render existing cards + optional source links

Content/CMS -> Django published serving data -> idempotent indexing task
           -> existing AssistantKnowledgeChunk (+ real vector index IF justified)
```

### Ownership/invariants

- **Django** quản lý published source data, account/session, knowledge index, retrieval, API, business rules và side effects. **Odoo** là CRM/CMS back-office ở ranh giới integration hiện có. **Next.js** là presentation/BFF, không tự tìm từ Odoo DB hoặc tự tính booking amount.
- Giá tour, tình trạng publish/active, availability, policy, link cards phải đối chiếu **DB/API có thẩm quyền tại thời điểm trả lời**, không tin vào vector metadata cũ hay văn bản LLM. Với affiliate listings, phân biệt `price_from` tham khảo và giá xác nhận từ provider.
- Không đưa draft/private/expired/archived data vào public retrieval. Áp dụng permission filter **trước khi** đưa chunk sang LLM. Source URLs do backend xác thực/allowlist, không xây từ text do model tạo.
- Mọi Jev/LLM output là **suggestion**, phải validate schema/allowed route/ownership và failure policy tại Django trước bất kỳ hành động nào. Retrieval content là dữ liệu không đáng tin, không được thực thi instruction trong chunk.

## 4. THIẾT KẾ RAG (KEEP IT SMALL)

### 4.1 Indexing: ưu tiên incremental, deterministic

- Dùng `AssistantKnowledgeChunk` hiện có. Xác định các source model thật sự đủ nội dung: `Destination`, `Place`, `Tour`, `Article`, `Guide` và các policy *đã được cấp quyền dùng public*. Không index nhầm dữ liệu cá nhân, tin nhắn chat, draft hoặc nội dung Odoo chưa đồng bộ hợp lệ.
- Entity/key logic đề xuất: `(entity_type, entity_id, locale, chunk_index)` hoặc key đã có trong repo. Bổ sung constraint **chỉ khi migrations hiện tại cho phép và không làm mất dữ liệu**. Với nội dung ngắn, 1 chunk/entity; chia chunk theo heading/đoạn khi tài liệu dài, có overlap tối thiểu nếu cần. Không xây generic ETL platform.
- Mỗi chunk cần các trường/metadata đủ để xác minh: `source_type`, `source_id`, `slug`, `locale`, `title`, `canonical_url`, `published_state`, `source_updated_at`, `content_hash`, `embedding_model/version`, `indexed_at`. Dùng fields đã tồn tại nếu phù hợp; tránh thêm column cho tất cả metadata khi JSON field đủ.
- Chạy idempotent reindex; cùng nội dung cùng config -> không tạo trùng/chạy embedding vô ích. Nếu unpublish/delete -> loại khỏi index hoặc filter chắc chắn; nếu event đến sai thứ tự -> không ghi đè nội dung mới. Có lệnh backfill/rebuild **có thể chạy lặp lại** và test.
- Dùng Celery hiện có **nếu** async pipeline thực sự đã được cấu hình. Schedule task sau `transaction.on_commit`; retry có giới hạn + log lỗi. Không viết signal mới trùng logic nếu đã có service/event publisher chuẩn.
- Chọn **một embedding model** đang được project config/cho phép. Dimension, model version và migration strategy phải nhất quán. Không ngầm fallback local↔cloud hoặc gọi embedding API trên mỗi lần seed/test.

### 4.2 Retrieval: hybrid với baseline có thể đo

1. Xác thực actor/locale + chuẩn hóa query an toàn (không biến user text thành SQL/tsquery raw).
2. Lọc published, locale, entity scope, permissions ở query DB.
3. Exact/structured request (tour ID, price, near me, availability): lấy từ ORM/PostGIS; không bắt buộc gọi vector.
4. Knowledge request: query keyword (`Postgres FTS` nếu tiếng Việt cho chất lượng đủ; nếu không, dùng phương án lexical đã có và đánh giá) + vector similarity (chỉ khi index chạy thật). Nếu vector chưa sẵn sàng: giữ keyword-only **degraded mode có khai báo**, không tạo fake vector result.
5. Hợp nhất candidates bằng **RRF hoặc cách xếp hạng đơn giản có đánh giá**, giữ trace các thành phần score và source. Tránh hard-coded boosts kiểu `+80` không được kiểm bằng dataset. Chỉ thêm reranker model mới khi benchmark chứng minh cần thiết.
6. Trả top-k nhỏ (khởi điểm 4–6), chunks tối đa theo context budget, dedupe cùng nguồn, loại nguồn stale/unpublished, trả provenance.
7. Nếu không có đủ bằng chứng, phản hồi 'chưa có dữ liệu xác nhận' + gợi ý người dùng hỏi bộ phận tư vấn; không bịa giá, giờ mở cửa, lịch trình hay chính sách.

**Vector migration — conditional decision:** Vì public `AssistantKnowledgeChunk.embedding` hiện là JSON, đừng đổi ngay sang pgvector chỉ dựa trên README. Phase 0 kiểm tra dependency `pgvector`, extension trong DB image, migrations, actual SQL/traversal, số lượng chunk và latency. Nếu vector path còn nhỏ và chưa có nhu cầu chỉ mục, cải thiện đúng retrieval trước. Nếu mục tiêu hybrid ANN cần thật: thêm `VectorField`/column qua migration tương thích, backfill dữ liệu theo model dimension, kiểm tra null/rollback/read-path, tạo HNSW **khi có lý do về kích thước/tốc độ**, rồi mới loại legacy JSON. Không xóa dữ liệu cũ trước khi kiểm chứng. Không giả vờ JSONField tương đương indexed pgvector.

### 4.3 Grounded response & citations

- Giữ service `generate_response` hiện tại; prompt ngắn, rõ trust boundary: system rules > authenticated DB > retrieved reference text > user text. **Không tự tin tuyên bố '100% zero hallucination'.**
- Factual claims về destination/tour/policy phải trace được về source; mỗi source gồm type + canonical ID/slug + URL xác thực. Các card phải được join/lookup lại DB từ allowed IDs, không parse tự do để tin giá/availability trong câu trả lời.
- Response mới **mở rộng, không phá vỡ** field `reply`, `recommended_tours`, `conversation_id`, `session_token` và các cards đang được frontend sử dụng. Nếu cần `sources`, `route`, `status`, thêm optional fields và cập nhật OpenAPI/shared TS contract.
- `no_evidence`/`degraded`/`provider_unavailable` là trạng thái thật, không hiển thị dữ liệu demo hay câu trả lời giả như thành công.

## 5. THIẾT KẾ JEV — HAI VAI TRÒ KHÁC NHAU

### A. Jev dùng bởi coding agent (bắt buộc theo repo)

- Dùng `AGENTS.md` registry để quyết định gọi skill nào cho từng phase: backend/DB -> Caveman + TDD + Superpowers; frontend -> thêm Matt Pocock/UI/Web Quality khi UI thực sự thay đổi. Không cố tích hợp SDK Jev vào toolchain developer nếu `AGENTS.md` không yêu cầu.

### B. Jev runtime cho Travel Concierge (tích hợp hẹp, có cổng quyết định)

**Một candidate duy nhất cho MVP:** `Choice` chọn route khi **deterministic routing không đủ chắc**. Chỉ whitelist các route có handler đang tồn tại:

| Route | Ý nghĩa | Hành động do code thực thi |
| --- | --- | --- |
| `knowledge` | Hỏi kiến thức/cẩm nang/chính sách | RAG + evidence-based answer |
| `discovery` | Tìm tour/địa điểm/trải nghiệm | ORM filters + hybrid evidence |
| `itinerary` | Muốn gợi ý lịch trình | Planner đơn giản với DB constraints (nếu module hiện có) |
| `lead_inquiry` | Muốn trao đổi/nhận báo giá | Trình bày form xác nhận; **không tạo CRM lead tự động** |
| `clarify` | Thiếu thông tin/mơ hồ | Hỏi thêm người dùng |

- **Không để Jev sinh SQL, JSON nghiệp vụ, văn bản tư vấn, budget arithmetic, geospatial math, tool arguments hoặc quyết định permission.** `Score/Noul` để sau khi có benchmark/case thật; không thêm nhiều calls chỉ để tăng vẻ 'agentic'.
- Jev input tối giản: user message đã giảm PII, locale, safe task/context metadata và **closed candidate IDs**. Không gửi toàn bộ transcript, credentials, nội dung DB private. Provider/SDK/API version và hợp đồng response phải xác nhận theo docs/package tại thời điểm triển khai; không đoán endpoint.
- Jev response phải qua validation: allowed route, confidence/probabilities (nếu provider hỗ trợ), timeout, rate limit, schema error. Policy chọn fallback dựa trên test set/baseline, **không dùng ngưỡng 0.90 tùy tiện**. Cho phép `clarify`/`none` khi thiếu dữ kiện.
- Phương án an toàn: `JEV_ROUTER_ENABLED=false` mặc định; khi chưa có provider/key hoặc quality/cost chưa tốt -> deterministic router đang có. Nếu gọi Jev bị lỗi -> fallback router hiện tại (không bypass auth/consent). Không gửi riêng tư tới cloud khi chưa có sự chấp thuận cấu hình.
- Benchmark chính xác **cùng một tập request** giữa: baseline router và Jev-assisted route. Chỉ enable khi giảm lỗi intent đáng kể mà không làm tăng chi phí/độ trễ quá mức đã chốt. Ghi route chosen, confidence, fallback reason, latency, correlation ID; không log PII/raw private prompt.
- Jev không có quyền trigger side effects: action như `create_lead`, đặt chỗ, thanh toán vẫn yêu cầu form, validate + permission + confirmation tại backend.

**Lưu ý:** Nếu người dùng/maintainer chỉ muốn *Jev routing coding skills*, giữ phần B ở trạng thái `NOT_ENABLED` và vẫn giao được RAG chất lượng. Nếu yêu cầu phải có Jev runtime thật, Phase 3 phải test với provider thật trước khi claim hoàn tất; không tráo thành rule-based rồi gọi là 'Jev integrated'.

## 6. API, FRONTEND & CRM — COMPATIBILITY FIRST

- **Endpoint:** bắt đầu từ route đang tồn tại (ví dụ `/api/v1/assistant/conversations/chat/` qua BFF). Không tự thêm `/api/v1/ai/chat` nếu không có nhu cầu migration/versioning cụ thể.
- **Session security:** kiểm tra `AllowAny` + `session_token` lookup hiện có; anonymous chat được phép **không đồng nghĩa** được đọc toàn bộ conversation bằng token do client truyền tùy ý. Dùng authenticated user ownership hoặc opaque session binding/token có entropy phù hợp, TTL và policy rõ. Không expose session history của người khác; cẩn thận data migration.
- **Lead side effect:** contact details trong chat không tự động tương đương consent. Chỉ tạo khi người dùng xác nhận hành động gửi yêu cầu hoặc form lead với consent theo flow hiện hành. Validate phone/email; dedupe/idempotent event; không gọi Odoo trực tiếp từ LLM. CRM unavailable -> event pending/retry rõ ràng; không cam kết SLA tùy tiện.
- **Frontend:** reuse assistant bubble/drawer, existing tour/accommodation/restaurant card components, shared types. Chỉ thêm nguồn trích dẫn, empty-state, lỗi/fallback UI và CTA xác nhận gửi lead. Giữ i18n vi/en, a11y, mobile behavior; không tạo design system mới.
- **Odoo:** ingestion từ Odoo CMS chỉ nếu contract hiện có, đã verify signature/ownership/publication state và có test. Không cho AI cập nhật CRM hay CMS bằng một lệnh trống quyền.

### Response contract mở rộng minh họa (không mặc định overwrite contract cũ)

```json
{
  "conversation_id": "<existing-id>",
  "reply": "<grounded answer>",
  "recommended_tours": [],
  "sources": [
    {"entity_type": "destination", "entity_id": "<db-id>", "title": "<db-title>", "url": "/destinations/<slug>"}
  ],
  "route": "knowledge",
  "status": "ok"
}
```

`<...>` là ký hiệu minh họa, **không phải dữ liệu trả về thực tế**. Định dạng cuối cùng phải tương thích serializers/OpenAPI/frontend hiện có.

## 7. EXECUTION PLAN — CÁC TASK NHỎ CÓ EXIT GATE

### Phase 0 — Audit & Baseline (NO feature edits)

**Mục tiêu:** biết chính xác có gì trước khi đụng architecture.

- [ ] P0.1 Đọc context, source, migrations, tests, Docker/requirements, CI và contract UI. Lập bảng existing/working/broken/missing với đường dẫn và bằng chứng.
- [ ] P0.2 Vẽ data flow *thực tế*: request chat → auth/session → retrieval → generator → cards → lead/outbox → response. Chỉ ra các đường gọi provider/network.
- [ ] P0.3 Kiểm tra `pgvector` extension/adapter/index/migration, `JSONField` embedding, reindex task, publish/unpublish và data sources; ghi rõ là keyword-only/vector JSON/pgvector thật.
- [ ] P0.4 Tạo bộ regression/eval fixture versioned từ dữ liệu nguồn hiện tại: tối thiểu 25–40 case có expected source IDs; gồm vi/en, query không có dữ liệu, unpublished, lookup giá, near-me, itinerary, injection và lead consent.
- [ ] P0.5 Chạy baseline tests/build theo repo và benchmark retrieval/router (nếu môi trường có DB/LLM); ghi chỉ số quan sát, không bịa số đo.

**Gate 0:** Có inventory, gap list xếp P0/P1/P2, lệnh test pass/fail rõ ràng, minimal design và migration decision. Chưa đủ thông tin thì không triển khai toàn bộ plan theo suy đoán.

### Phase 1 — P0 Safety & Current Flow Stabilization

**Mục tiêu:** loại bỏ rủi ro trong đường chat hiện tại trước khi bổ sung LLM/tool routing.

- [ ] P1.1 Test và fix authorization/isolation cho conversations/messages/session token, kể cả anonymous và user đã đăng nhập. Giữ public chat hoạt động.
- [ ] P1.2 Chặn lead creation không có confirmed consent, duplicate event, repeated chat/refresh; giữ outbox contract. Nếu cần thay đổi public behavior, ghi rõ và test UI.
- [ ] P1.3 Thay `except: pass` trên critical card/retrieval path bằng xử lý có observability, fallback minh bạch; không tái cấu trúc unrelated handlers.
- [ ] P1.4 Input length, rate limits, provider timeout, secrets hygiene, output URL allowlist và prompt injection boundary. Không dựa vào regex cấm từ khóa như một bảo vệ hoàn chỉnh.

**Gate 1:** Tests cho cross-user transcript, invalid token, anonymous permissions, unconsented lead, duplicate CRM, timeout/error đều pass. Các luồng không liên quan không regress.

### Phase 2 — RAG Grounding & Retrieval Upgrade

**Mục tiêu:** chất lượng tri thức tốt hơn, không duplicate data pipeline.

- [ ] P2.1 Chốt tập source published thật sự (Destination/Place/Tour/Article/Guide); tận dụng chunk model, indexing command/tasks đang có.
- [ ] P2.2 Fix lifecycle index: publish/update/unpublish/delete; content hash + stable entity/chunk key; repeat backfill không duplicate.
- [ ] P2.3 Thực hiện retrieval với structured filter + lexical + vector nếu index hỗ trợ. Nếu cần pgvector thật: migration non-destructive, backfill, test SQL/index/query plan; otherwise keyword/JSON approach được đánh dấu degraded/limited.
- [ ] P2.4 Loại boosts thiếu bằng chứng, rerank bằng RRF/simple scoring dựa trên test; giữ output provenance/IDs.
- [ ] P2.5 Cập nhật generator/structured cards để kiểm tra thông tin tại DB; thêm source links và honest no-evidence path.
- [ ] P2.6 Regression tests + đánh giá retrieval. Giữ API chat hiện có; sửa contract additively.

**Gate 2:** Không leak draft/private; không bịa giá/địa điểm chưa có; reindex idempotent; nguồn trích đúng IDs; test/citations không regress baseline. Chứng minh pgvector bằng schema/query nếu tuyên bố đã tích hợp.

### Phase 3 — Jev Runtime Routing (limited pilot)

**Mục tiêu:** thêm Jev ở đúng một decision point, không 'agent hóa' mọi thứ.

- [ ] P3.1 Xác định deterministic intent router hiện tại và contract. Tạo test dataset gồm các input mơ hồ/đơn giản, expected route và no-match.
- [ ] P3.2 Xác nhận Jev provider, SDK/version, consent/network policy và cấu hình. Key chỉ trong env/secret manager; chưa được phép -> giữ feature flag off và đánh dấu blocked.
- [ ] P3.3 Implement thin `JevRouteSelector` **chỉ khi chưa có adapter tương đương**, dùng `Choice` closed routes; hard code validation/fallback; timeout và logs an toàn.
- [ ] P3.4 `Router`: clear deterministic intent không gọi Jev; ambiguous mới gọi Jev. `lead_inquiry` chỉ điều hướng đến form có consent, không tự trigger CRM. Khi Jev lỗi -> fallback hiện có.
- [ ] P3.5 A/B offline benchmark Jev enabled vs baseline trên cùng fixture; báo route accuracy, abstention, cost, latency, timeout; giữ disabled nếu không có lợi ích đáng kể.

**Gate 3:** Có test với response thật của provider được cấu hình hoặc ghi rõ `BLOCKED_EXTERNAL_CREDENTIALS`; fallback/router unit/integration đều pass; không có side effect từ model suggestion. Không viết 'Jev integrated' chỉ vì tồn tại interface/mock.

### Phase 4 — Itinerary + UI (only after grounding)

**Mục tiêu:** một vertical slice được dùng thật trên frontend hiện có.

- [ ] P4.1 Kiểm tra itinerary/tour/nearby modules hiện có; dùng ORM/PostGIS và các contract thật. Không tạo trip planner platform mới.
- [ ] P4.2 Chỉ thêm planner tối giản: input `destination`, `days`, `budget`, `interests`, `pace`; validate bounds; chọn địa điểm published, ước lượng/khả năng di chuyển với nhãn phù hợp. Không tự bịa live routing hoặc booking availability.
- [ ] P4.3 Nối result đến existing chat widget/cards; có sources, no-data state, error state, form xác nhận lead; giữ i18n vi/en.
- [ ] P4.4 One happy path E2E + at least three failures: không có nội dung, provider down, dữ liệu unpublished/invalid.

**Gate 4:** Người dùng chat → có grounded source/tour/place card → tạo gợi ý lịch trình hợp lệ → tùy chọn gửi inquiry có xác nhận → dữ liệu hiện ở CRM thông qua integration đã có (nếu Odoo sandbox được cấu hình). UI không có contract regress.

### Phase 5 — Release Review & Evidence

- [ ] P5.1 Chạy toàn bộ validation `makemigrations --check`, DB migrations trên DB mới và DB có seed data, Django checks, formatter/linter/typecheck/tests, frontend typecheck/build/E2E theo lệnh hiện có; không tự bịa tên `make` command.
- [ ] P5.2 Review query plan/index, DB N+1, LLM/Jev timeouts, embedding cost, log PII, concurrency, stale index và rollback feature flag.
- [ ] P5.3 So sánh bảng *before/after* có số đo thật: source Recall@k, route accuracy, no-answer correctness, p50/p95 latency, cost per request (nếu có telemetry).
- [ ] P5.4 Review diff: không xóa code ngoài scope, không nâng cấp dependency bừa bãi, không migrate/clean DB phá dữ liệu; cập nhật `context/architecture.md`, `context/progress-tracker.md`, docs đặc tả khi code và context khác nhau.
- [ ] P5.5 Demo từ clean checkout bằng seed hợp lệ; ghi rõ external key/Odoo sandbox không sẵn có thì case nào chỉ được mock/test local, không claim production integration.

**Gate 5:** Kết quả chạy check minh bạch, rollback được, không ghi secrets, không làm hỏng luồng booking/partner/content/CRM; có hướng dẫn bật/tắt Jev và reindex.

## 8. QUALITY MATRIX / ACCEPTANCE CRITERIA

| Nhóm | Case phải có | Điều kiện pass |
| --- | --- | --- |
| Retrieval | Keyword vs semantic, vi/en, sai chính tả, cùng tên địa danh | Có đúng source IDs trong top-k trên fixture; **không kém baseline**; cải thiện được chứng minh bằng đo |
| Grounding | Câu hỏi có/không có dữ liệu, nguồn cũ, giá không khớp | Chỉ trả fact đã kiểm từ DB/approved source; no-evidence rõ ràng |
| Publication | Draft, unpublish, deleted, private | Public API/LLM không nhìn thấy nội dung bị hạn chế |
| Identity | Hai user dùng session khác nhau; invalid/stolen token | Không đọc/sửa conversation người khác |
| CRM | Có số điện thoại nhưng chưa xác nhận; bấm submit hai lần | Không gửi lead thiếu consent; sau xác nhận không tạo duplicate |
| Failure | Jev 401/429/5xx/timeout, LLM timeout, DB missing index | Fallback có kiểm soát, không bịa thành công, không bypass security |
| Injection | Malicious user query hoặc nội dung CMS 'ignore instructions' | Nội dung chỉ là data; không lấy quyền cao hơn, không leak secrets |
| Itinerary | Thời gian/ngân sách ngoài range, quá ít places, unpublished item | Validate deterministic; không lập lịch trình giả chính xác |
| Integration | Odoo down/retry, out-of-order CMS update | Website read vẫn hoạt động; side effect idempotent; không ghi đè data mới bằng event cũ |
| Regression | Tours/payments/partners/reviews/auth/frontend | Suite hiện tại và smoke flow cốt lõi vẫn pass |

**Metric policy:** Đặt threshold sau baseline. Tối thiểu: **0 critical privacy/permission/consent regression**, không có card/giá liên quan thực thể không tồn tại hoặc không publish trong fixtures, và RAG retrieval/router không giảm chất lượng so với bản đang chạy. Số lượng test case là *mục tiêu thiết kế*, không phải khẳng định đã chạy.

## 9. ANTI-OVERENGINEERING RULES — RÀO CHẮN CỨNG

1. **One module, one owner:** Có `assistant` thì mở rộng `assistant`, không thêm `ai_engine/`, `rag_service/`, `agents_api/` đồng thời.
2. **One real decision first:** Jev chỉ pilot `Choice` intent routing. Chưa có evidence -> không thêm `Noul`, `Score`, đa agent, recursive tool loops.
3. **One provider per configured capability:** Không auto chuyển từ local sang cloud hay cloud A sang cloud B. Tùy chọn model/provider thuộc người vận hành.
4. **One database source of truth:** PostgreSQL hiện tại; không dựng vector DB mới. Chỉ thêm pgvector index/migration khi đã đánh giá DB hiện tại.
5. **No speculative abstractions:** Interface/port chỉ khi kết nối Jev/LLM là boundary thật; không tạo `BaseFactoryManagerRegistry` hay generic pipelines không dùng.
6. **No frontend duplicate:** Nếu có widget, sửa widget. Không dựng AI dashboard hay chat page mới trừ khi yêu cầu.
7. **No unrelated cleanup:** Không auto-format toàn bộ repo, đổi router, nâng framework, chuyển package manager, rewrite Odoo integration, xóa dead code ngoài phạm vi.
8. **No fake pass:** Không 'mock' kết quả runtime để báo hoàn thành, không bỏ test đỏ, không đổi assertion để hợp code.
9. **No unsafe migration:** Migration có kế hoạch backfill/rollback, không drop legacy embedding/records khi chưa kiểm chứng và được phê duyệt.
10. **No docs sprawl:** Chỉ một tài liệu kế hoạch này; cập nhật chính các context/docs sở hữu thông tin, tránh tạo bản spec trùng lặp mới.

**Quy tắc quyết định khi phát sinh đề xuất mới:** Hỏi "Chức năng hiện tại không giải quyết được điều gì? Có test/metric chứng minh không? Cách sửa ít file nhất là gì?". Nếu không trả lời bằng bằng chứng, đưa vào `Deferred`, **không implement**.

## 10. DEFINITION OF DONE & FORMAT BÁO CÁO CUỐI MỖI PHASE

Trả lời ngắn theo template:

```text
PHASE: <0..5> / STATUS: DONE | PARTIAL | BLOCKED
OBSERVED BEFORE: <file paths + verified behavior>
CHANGES: <exact files, contract/migration impact>
TESTS RUN: <exact commands, pass/fail counts; skipped reasons>
SECURITY/DATA: <verified boundaries + remaining risk>
METRICS: <measured only; otherwise NOT_MEASURED>
OUT OF SCOPE: <what was deliberately not changed>
NEXT: <smallest next task + acceptance gate>
```

Chỉ dùng `DONE` khi acceptance gate của phase thực sự đạt. Nếu test không chạy vì thiếu Docker/DB/credential, `PARTIAL/BLOCKED` + nguyên nhân, **không ghi PASS**. Sau mỗi phase review diff; không được tự làm phase 4 trong khi phase 1 security chưa đạt.

## 11. READY-TO-RUN AGENT PROMPT

> Hãy đọc toàn bộ `TRAVEL_RAG_JEV_IMPLEMENTATION_PLAN.md` và `AGENTS.md` từ repository hiện tại. Thực hiện **Phase 0 trước, tuyệt đối chưa code feature**. Đối chiếu các quan sát với source/migrations/tests thực tế; phân biệt `OBSERVED`, `DECLARED`, `INFERRED`, `UNDECIDED`. Lập inventory, gap list và kế hoạch thay đổi tối thiểu. Sau khi có baseline, triển khai lần lượt Phase 1 → 5 theo acceptance gates, ưu tiên dùng lại `apps/api/assistant`, retrieval, generator, CRM outbox và frontend widget hiện tại. Dùng Jev theo `AGENTS.md` để chọn skills; chỉ tích hợp Jev runtime Choice router bằng feature flag khi đã xác minh provider, test contract và chứng minh tốt hơn baseline. Mỗi task có test, không mở rộng scope, không over-engineer, không phá migration/data. Sau mỗi phase báo paths, lệnh test thật, kết quả và blocker. Không tuyên bố hoàn tất khi chưa kiểm chứng.

## 12. REFERENCE NOTES

- Repository-specific priority: `AGENTS.md` + six context files **ở checkout đang làm việc**, không phải assumptions trong kế hoạch này.
- Existing RAG master spec: `docs/ai-assistant-and-rag-spec.md`; sử dụng để biết product intent, không xem như bằng chứng feature đã được triển khai đúng.
- Jev narrow typed decisions: https://github.com/wuyoscar/jev-skill/blob/main/skills/jev/references/agent-recipes.md
- Official pgvector hybrid-search guidance: https://github.com/pgvector/pgvector#hybrid-search
- Phần này là **implementation instruction**, không phải chứng chỉ production hay báo cáo code đã build/test.

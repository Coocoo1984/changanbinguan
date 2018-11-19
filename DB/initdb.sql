
--- 业务类型 ---
INSERT INTO "main"."biz_type"("id", "code", "name", "desc", "disable") VALUES (1, '01', '餐饮食材', '餐饮食材', 0);
INSERT INTO "main"."biz_type"("id", "code", "name", "desc", "disable") VALUES (2, '02', '酒店物资', '酒店物资', 0);
INSERT INTO "main"."biz_type"("id", "code", "name", "desc", "disable") VALUES (3, '03', '办公用品', '办公用品', 0);
--- 业务类型 ---

--- 采购计划状态 ---
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (1, '01', '需求草稿', '部门采购需求计划草稿');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (2, '02', '提初审', '部门采购需求计划提交等待初审');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (3, '03', '初审驳回', '部门采购需求计划初审驳回');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (4, '04', '再提初审', '部门采购需求计划初审驳回后重新提交待初审');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (5, '05', '初审通过', '部门采购计划初审通过，即复审草稿');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (6, '06', '提复审', '部门采购计划初审通过等待复审');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (7, '07', '复审驳回', '部门采购计划复审驳回');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (8, '08', '再提复审', '部门采购计划复审驳回后重新提交待复审');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (9, '09', '复审通过', '部门采购计划复审通过采购订单生成');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (10, '10', '收货入库', '部门采购计划复审通过');
INSERT INTO "main"."purchasing_state"("id", "code", "name", "desc") VALUES (11, '11', '其他', '其他特殊状态');
--- 采购计划状态 ---

--- 采购订单状态 ---
INSERT INTO "main"."purchasing_order_state"("id", "code", "name", "desc") VALUES (1, '01', '待供应商确认', '待供应商确认');
INSERT INTO "main"."purchasing_order_state"("id", "code", "name", "desc") VALUES (2, '02', '供应商已确认', '供应商确认后即为备货中状态');
INSERT INTO "main"."purchasing_order_state"("id", "code", "name", "desc") VALUES (3, '03', '已发货', '供应商备货完成已经发货出来');
INSERT INTO "main"."purchasing_order_state"("id", "code", "name", "desc") VALUES (4, '04', '已收货', '部门确认正常收货');
INSERT INTO "main"."purchasing_order_state"("id", "code", "name", "desc") VALUES (5, '05', '收货不足量', '部门但为达到收货单计划量但收货');
INSERT INTO "main"."purchasing_order_state"("id", "code", "name", "desc") VALUES (6, '06', '其他', '预留状态');
--- 采购订单状态 ---


--- 商品类目 (仅包括餐饮食材) ---
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (1, "0101", "毛菜", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (2, "0102", "豆制品、面点", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (3, "0103", "猪肉", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (4, "0104", "家禽", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (5, "0105", "水产冻品", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (6, "0106", "干副", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (7, "0107", "蛋米面", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (8, "0108", "干货调味", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (9, "0109", "泡菜类", NULL, NULL, NULL, 1, 0);
INSERT INTO "main"."goods_class"("id", "code", "name", "specification", "desc", "remark", "biz_type_id", "disable") VALUES (10, "0110", "食百商品", NULL, NULL, NULL, 1, 0);
--- 商品类目 (仅包括餐饮食材) ---

--- 商品单位 ---
INSERT INTO "main"."goods_unit"("id", "code", "name", "desc", "remark") VALUES (1, "001", "KG", "千克", NULL);
INSERT INTO "main"."goods_unit"("id", "code", "name", "desc", "remark") VALUES (2, "002", "个", "个", NULL);
INSERT INTO "main"."goods_unit"("id", "code", "name", "desc", "remark") VALUES (3, "003", "袋", "袋", NULL);
--- 商品单位 ---

--- 商品 ---
INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (1, NULL, '白萝卜', '559', NULL, 1, 1, 0);
INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (2, NULL, '新土豆', '3695', NULL, 1, 1, 0);
INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (3, NULL, '娃娃菜', '2070', NULL, 2, 1, 0);
INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (4, NULL, '清水笋业务包(彩食鲜)', '924427', '3个/袋', 3, 1, 0);

INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (5, NULL, '三线肉(2级)', '55555', NULL, 1, 3, 0);
INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (6, NULL, '肉馅(2级)', '666666', NULL, 1, 3, 0);

INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (7, NULL, '已杀公鸡(2级)', '777777', NULL, 1, 3, 0);
INSERT INTO "main"."goods"("id", "code", "name", "specification", "desc", "goods_unit_id", "goods_class_id", "disable") VALUES (8, NULL, '已杀鸭子(2级)', '888888', NULL, 1, 3, 0);
--- 商品 ---



--- 角色 ---
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (1, NULL, 'zc', '部门采购负责人');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (2, NULL, 'kg', '部门库管');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (3, NULL, 'cgy', '采购部采购员');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (4, NULL, 'cgzg', '采购部采购主管');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (5, NULL, 'cgzj', '管理部采购总监');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (6, NULL, 'gys', '供应商');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (7, NULL, 'xtgly', '系统管理员');
INSERT INTO "main"."role"("id", "wechat_roup_id", "code", "name") VALUES (8, NULL, 'CEO', '老总');
--- 角色 ---

--- 部门 ---
INSERT INTO "main"."department"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1") VALUES (1, NULL, 'DEV01', '开测测试1', NULL, NULL, NULL, '13752900669', NULL, '开发测试地址1', NULL);
INSERT INTO "main"."department"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1") VALUES (2, NULL, 'DEV02', '开测测试2', NULL, NULL, NULL, '13752900669', NULL, '开发测试地址2', NULL);
INSERT INTO "main"."department"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1") VALUES (3, NULL, 'CY01', '餐饮部1', '食堂1', NULL, NULL, '13752900669', NULL, '餐饮部1地址', NULL);
INSERT INTO "main"."department"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1") VALUES (4, NULL, 'CY02', '餐饮部2', '食堂2', NULL, NULL, '13752900669', NULL, '餐饮部2地址', NULL);
INSERT INTO "main"."department"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1") VALUES (5, NULL, 'CG', '采购部', '采购中心', NULL, NULL, '13752900669', NULL, '采购中心', NULL);
INSERT INTO "main"."department"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1") VALUES (6, NULL, 'GL', '管理部', '管理部', NULL, NULL, '13752900669', NULL, '管理部', NULL);
--- 部门 ---

--- 用户 ---
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (1, NULL, 'CY01-01', '总厨走龙', '食堂1总厨', NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (2, NULL, 'CY02-01', '总厨章杰', '食堂2总厨', NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (3, NULL, 'yg-01', '永辉潘俊', '供应商永辉负责人潘俊', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 6, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (4, NULL, 'vendor01-01', '双福1王池', '供应商双福批发商1负责人王池', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 6, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (5, NULL, 'vendor02-01', '双福2余岳', '供应商双福批发商2负责人余岳', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 6, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (6, NULL, 'CG-01', '采购员熊雪凯', '采购部采购员', NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 3, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (7, NULL, 'CG-02', '采购主管陈琛', '采购部主管经理', NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 4, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (8, NULL, 'GL-01', '采购总监吴敏', '采购总监', NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 5, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (9, NULL, 'GL-02', '雷总', '总经理', NULL, NULL, NULL, NULL, NULL, NULL, 6, NULL, 8, 0);
INSERT INTO "main"."usr"("id", "wechat_id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "department_id", "vendor_id", "role_id", "disable") VALUES (10, NULL, 'DEV01-01', '贺彦', '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 7, 0);
--- 用户 ---

--- 用户 - 角色关联 ---


--- 用户 - 角色关联 ---


--- 供应商 ---
INSERT INTO "main"."vendor"("id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "remark", "disable") VALUES (1, 'yg', '永辉', NULL, NULL, NULL, '13752900669', NULL, NULL, NULL, NULL, 0);
INSERT INTO "main"."vendor"("id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "remark", "disable") VALUES (2, 'vendor01', '双福批发商1', NULL, NULL, NULL, '13752900669', NULL, NULL, NULL, NULL, 0);
INSERT INTO "main"."vendor"("id", "code", "name", "desc", "tel", "tel1", "mobile", "mobile1", "addr", "addr1", "remark", "disable") VALUES (3, 'vendor02', '双福批发商2', NULL, NULL, NULL, '13752900669', NULL, NULL, NULL, NULL, 0);
--- 供应商 ---

--- 供应商 - 商品类目关联 ---
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (1, 1, 1, 1, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (2, 1, 1, 2, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (3, 1, 1, 3, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (4, 1, 1, 4, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (5, 1, 1, 5, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (6, 1, 1, 6, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (7, 1, 1, 7, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (8, 1, 1, 8, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (9, 1, 1, 9, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (10, 1, 1, 10, NULL);

INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (11, 2, 1, 1, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (12, 2, 1, 2, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (13, 2, 1, 3, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (14, 2, 1, 4, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (15, 2, 1, 5, NULL);

INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (16, 3, 1, 1, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (17, 3, 1, 2, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (18, 3, 1, 3, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (19, 3, 1, 4, NULL);
INSERT INTO "main"."rs_vendor"("id", "vendor_id", "biz_type_id", "goods_class_id", "goods_id") VALUES (20, 3, 1, 5, NULL);
--- 供应商 - 商品类目关联 ---




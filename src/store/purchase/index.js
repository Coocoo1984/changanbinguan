import Vue from "vue";

export default {
    state: {
        add_datas: [

        ],
        quote_datas: [
            {
                title: "201811050830115",
                status: 1,
                slot: "55个项目"
            }, {
                title: "201811011555423",
                status: 2,
                slot: "12个项目"
            }, {
                title: "201811122445523",
                status: 3,
                slot: "17个项目"
            }
        ]
    },
    mutations: {
        pushAddData(state, item) {
            var m = state.add_datas.filter(i => i.goods_id == item.goods_id);
            if (m.length > 0) {
                m[0].count = parseInt(m[0].count) + parseInt(item.count);
            } else {
                state.add_datas.push(item);
            }
        },
        removeAddData(state, index) {
            Vue.delete(state.add_datas, index);
        },
        pushQuoteData(state, item) {
            state.quote_datas.push(item);
        },
    }
}
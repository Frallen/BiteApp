import {controlType, graphType, panelNavigationType, tableType} from "../types/global.types";
import type {Header, Item} from "vue3-easy-data-table";

interface stateType {
    Paths: panelNavigationType[]
    Control: controlType
    Graph: {
        labels: [string],
        datasets: [{
            label: string,
            data: [number]
        }]
    } | {},
    Table: {
        header: Header[]
        body: Item[]
    } | null
    isError: boolean
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        isError: false,
        Paths: [
            {
                id: 1,
                Title: "Панель",
                Icon: "menu.svg"
            },
            {
                id: 2,
                Title: "Кошелек",
                Icon: "logo.png"
            },
            {
                id: 3,
                Title: "Настройки",
                Icon: "settings.svg"
            }
        ],
        Control: {
            currentValue: 0,
            maxValue: 0,
            minValue: 0
        },
        Graph: {},
        Table: null
    }),
    getters: {
        PreparedControl(state) {
            return state.Control
        }
    },
    actions: {
        async getControl() {
            const {isFetching, error, data} = await useFetch(`https://dashboard.bit76.ru/controlValue/ `).get()
            if (error.value) {
                console.error(error.value)
                this.Error = true
            } else {

                this.Control = JSON.parse(data.value).value as controlType
            }
        },
        async getGraph() {
            const {
                isFetching,
                error,
                data
            } = await useFetch(`https://dashboard.bit76.ru/graphValues/`).get()
            if (error.value) {
                console.error(error.value)
                this.Error = true
            } else {

                this.Graph = {
                    labels: (JSON.parse(data.value) as graphType[]).map(p => p.timestep) as [string],
                    datasets: [
                        {
                            label: 'График потребления',
                            data: (JSON.parse(data.value) as graphType[]).map(p => p.currentValue) as [number]
                        }]
                }

            }
        },
        async getTableData() {
            const {
                isFetching,
                error,
                data
            } = await useFetch(`https://dashboard.bit76.ru/tableValues/`).get()
            if (error.value) {
                console.error(error.value)
                this.Error = true
            } else {
                const snap = JSON.parse(data.value) as tableType[]

                this.Table = {
                    header: [
                        {
                            text: "Дата",
                            value: "date"
                        },
                        {
                            text: "Текушее значение",
                            value: "currentValue"
                        },
                        {
                            text: "Предыдушее значение",
                            value: "prevValue"
                        },
                        {
                            text: "Изменение в %",
                            value: "change"
                        }
                    ],

                    body: snap.map(p => {
                        return {

                            date: p.timestep,
                            currentValue: p.currentValue,
                            prevValue: p.prevValue,
                            change: p.change * 100
                        }
                    })
                }
            }
        }
    }

})
export interface panelNavigationType {
    id: number,
    Title: string
    Icon: string
}

export interface controlType {
    currentValue: number
    minValue: number
    maxValue: number
}

export interface graphType {
    currentValue: number
    timestep: string
}

export interface tableType {
    timestep: string
    currentValue: number
    prevValue: string
    change: number
}
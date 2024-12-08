
export default interface BaseHook {
    id: number | '',
    created_at?: string,
    deleted_at?: string,
    updated_at?: string,
    errors: string[],
    isDisabled: boolean,
    setId: (arg: number | '') => void,
    setCreated_at?: (arg: string) => void,
    setDeleted_at?: (arg: string) => void,
    setUpdated_at?: (arg: string) => void,
    setErrors: (arg: never[]) => void,
    setIsDisabled: (arg: boolean) => void,
}
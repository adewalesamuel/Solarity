
export default interface BaseHook {
    id: number | '',
    created_at?: string,
    deleted_at?: string,
    updated_at?: string,
    errors: string[],
    isDisabled: boolean,
    setId: (arg: number | '') => any,
    setCreated_at?: (arg: string) => any,
    setDeleted_at?: (arg: string) => any,
    setUpdated_at?: (arg: string) => any,
    setErrors: (arg: never[]) => any,
    setIsDisabled?: (arg: boolean) => void,
}
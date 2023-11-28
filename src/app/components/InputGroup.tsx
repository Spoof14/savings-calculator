


type InputGroupProps = React.PropsWithChildren<{
    flexDirection?: 'row' | 'column'
}>
export const InputGroup = ({ flexDirection = 'row', children }: InputGroupProps) => {
    return <div className={`flex gap-2 flex-wrap ${flexDirection === 'row' ? 'flex-row' : 'flex-col'}`}>
        {children}
    </div>
}
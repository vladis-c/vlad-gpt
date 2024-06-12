type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
type FunctionProps<T, K extends number> = Parameters<T>[K];
type ObjectValues<T> = T[keyof T];

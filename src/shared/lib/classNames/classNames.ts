type Mods = Record<string, boolean | undefined | string>;

export function classNames(
    cls: string,
    mods: Mods,
    additional: string[]
): string {
    return [
        cls, 
        // выводим только те объекты у которых знач true и дальше изымаем их значения
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className),
        ...additional.filter(Boolean),
    ].join(' ');
}   

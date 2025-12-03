export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        weekday: 'long',
    }).format(date);
}

export function formatAmount($amount: number) : string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format($amount);
}

export function nullToEmptyString(arg: unknown) {
    return arg ?? "";
}
export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    console.log('Value:', value);
    const parts = value.split(`; ${name}=`);
    console.log('Parts:', parts);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

export function isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return typeof user !== 'undefined' && user !== null;
}

export function getUser(): { name: string; email: string; } {
    return JSON.parse(localStorage.getItem('user') as string);
}


export function getToken(): string {
    return localStorage.getItem('token') as string;
}
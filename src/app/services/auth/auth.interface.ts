export interface UsuarioResponse {
    [x: string]: { _doc: string; } | any;
    ok: boolean,
    usuario: Usuario,
    token: string
}

export interface Usuario {
    _id?: string,
    email: string,
    password?: string,
    rol?: string,
}
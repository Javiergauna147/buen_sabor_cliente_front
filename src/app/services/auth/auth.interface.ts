export interface UsuarioResponse {
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
export interface Report{
    results: Results;
}
export interface Identifier{
    dataIdentificador:string;
    situacaoIdentificador:string;
    valorSolicitado:string;
    valorPago:number;
    valorPendente:string;
}

export interface Bloqueio{
    dataBloqueio: string;
    situacaoBloqueio: string;
    valorBloqueado: string;
}
export interface Results{
    bloqueios: Bloqueio[];
    gerados: Identifier[];
    pagos: Identifier[];
    pendentes: Identifier[];

    saldoDisponivel: string;
    saldoReal: string;
    totalBloqueado: string;
    totalIdentificadorGerado: string;
    totalIdentificadorPago: string;
    totalIdentificadorPendente:  string;

}


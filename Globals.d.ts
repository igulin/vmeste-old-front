declare interface APIResponse<D> {
    message?: D;
    error?: "Bad request";
    statusCode?: 400;
}

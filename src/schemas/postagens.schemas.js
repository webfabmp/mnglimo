module.exports = {
    type: "object",
    properties: {
        titulo: { type: "string", maxLength: 100 },
        texto: { type: "string" },
        categoria: { type: "string" },
        local: { type: "string" },
        contato: { type: "string" },
        nomeusuario: { type: "string" }
    },
    required: ["titulo", "categoria", "local", "contato", "nomeusuario"],
    additionalProperties: true
}
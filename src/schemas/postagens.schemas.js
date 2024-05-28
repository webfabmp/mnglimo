module.exports = {
    type: "object",
    properties: {
        titulo: { type: "string", maxLength: 100 },
        texto: { type: "string" },
        categoria: { type: "string" },
        local: { type: "string" },
        contato: { type: "string" },
        nomeUsuario: { type: "string" }
    },
    required: ["titulo", "categoria", "local", "contato", "nomeUsuario"],
    additionalProperties: false
}
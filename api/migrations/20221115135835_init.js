function up(knex) {
    return knex.schema.raw(`
        CREATE TABLE total (
            dt      DATE PRIMARY KEY DEFAULT NOW(),
            count   BIGINT NOT NULL
        );

        CREATE TABLE fields (
            dt      DATE PRIMARY KEY DEFAULT NOW(),
            dim     TEXT NOT NULL,
            stats   JSONB NOT NULL
        );
    `);
}

function down(knex) {
    return knex.schema.raw(``);
}

export {
    up,
    down
}

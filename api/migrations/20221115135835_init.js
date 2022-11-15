function up(knex) {
    return knex.schema.raw(`
        CREATE TABLE total (
            dt      PRIMARY KEY DEFAULT NOW(),
            count   BIGINT NOT NULL
        );

        CREATE TABLE fields (
            dt      PRIMARY KEY DEFAULT NOW(),
            dim     JSONB NOT NULL
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

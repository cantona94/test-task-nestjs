const EntitySchema = require('typeorm').EntitySchema;

export const HistoryOfAction = new EntitySchema({
  name: 'HistoryOfAction',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    idUser: {
      type: 'int',
    },
    typeAction: {
      type: 'varchar',
    },
    timeCreatedAction: {
      type: 'time',
      default: () => 'NOW()',
    },
  },
});

import ColumnFilter from "../../Componets/ResultTable/ColumnFilter/ColumnFilter.js";
export const columns = [
  {
    Header: "Фамилия",
    accessor: "userSurname",
    Filter: ColumnFilter
  },
  {
    Header: "Имя",
    accessor: "userName",
    Filter: ColumnFilter
  },
  {
    Header: "Время",
    accessor: "moment",
    Filter: ColumnFilter
  },
  {
    Header: "№ Свай",
    accessor: "pile",
    Filter: ColumnFilter
  },
  {
    Header: "Оголовок.Марка",
    accessor: "marksOM",
    Filter: ColumnFilter
  },
  {
    Header: "Труба.Свая,мм",
    accessor: "tube",
    Filter: ColumnFilter
  },
  {
    Header: "Толщина косынки,мм",
    accessor: "thinkness",
    Filter: ColumnFilter
  },
  {
    Header: "Вылет 1,мм",
    accessor: "gab1",
    Filter: ColumnFilter
  },
  {
    Header: "Вылет 2,мм",
    accessor: "gab2",
    Filter: ColumnFilter
  },
  {
    Header: "Вылет 3,мм",
    accessor: "gab3",
    Filter: ColumnFilter
  },
  {
    Header: "Вылет 4,мм",
    accessor: "gab4",
    Filter: ColumnFilter
  },
  {
    Header: "Вылет 5,мм",
    accessor: "gab5",
    Filter: ColumnFilter
  },
  {
    Header: "Вылет 6,мм",
    accessor: "gab6",
    Filter: ColumnFilter
  },
  {
    Header: "Количество конынок",
    accessor: "amount",
    Filter: ColumnFilter
  },
];
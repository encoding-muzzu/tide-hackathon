import React, { useMemo, useState, useEffect } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useFilters,
  useAsyncDebounce,
  useResizeColumns,
} from "react-table";

export const useTextFilter = (filterValue, setFilter) => {
  const [textValue, setTextValue] = React.useState(filterValue);
  const textChangeDebounce = useAsyncDebounce((txtVal) => {
    setFilter(txtVal || undefined);
    // setTextValue(txtVal || undefined);
  }, filterDebounceMs);
  return { textValue, setTextValue, textChangeDebounce };
};

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows?.length;

  return (
    <input
      style={{ width: "9.2rem" }}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  //   return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const filterDebounceMs = 300;
var checkState = false;

var clientCopyData
let table_headers = [];
const ReportTable = ({ columns, data, exportToCSV, clientSelected }) => {
  const [clientFinlaData, setClientFinalData] = useState([]);

  useEffect(() => {
    setClientFinalData(data)
    clientCopyData = data
  }, [data])



  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: clientFinlaData,
      defaultColumn,
      filterTypes,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    rows,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;


  useEffect(() => {
    if (clientSelected != null) {
      let filtereddata = clientCopyData.filter(ele => {
        return (ele["Client ID"] == clientSelected?.label)
      });
      setClientFinalData(filtereddata)
    }
  }, [clientSelected])


  return (
    <Row style={{ width: '100%' }}>
      <Col sm={12} className="col-12">
        <Card>
          <Card.Body className="p-0 example1-table">
            <div className="table-responsive">
              <>
                <div
                  id="customresponsivetable "
                  //   className={`${styles.roundedCorners} ${styles.customresponsivetable}}`}
                  style={{ margin: "0 auto", overflow: "auto" }}
                >
                  <table
                    {...getTableProps()}
                    className="table table-hover text-nowrap mb-0 table tablebshadow"
                    id="table-to-xls"
                  >
                    <thead>
                      {headerGroups.map((headerGroup, idx) => (
                        <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, idx) => (
                            <th
                              key={idx}
                              {...column.getHeaderProps()}

                              style={{ textAlign: "center", maxWidth: 250, textOverflow: 'clip', overflow: 'scroll', border: '1px solid #EBECFO' }}
                            >
                              {column.render("Header")}

                              <div>
                                {column.canFilter
                                  ? column.render("Filter")
                                  : null}
                              </div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row, idx) => {
                        prepareRow(row);

                        return (
                          <tr
                            key={idx}
                            className="text-center"
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell, i) => {

                              return (
                                <td
                                  key={i}
                                  data-title={`${table_headers[i]} : `}
                                  {...cell.getCellProps()}
                                  style={{ textAlign: "center", maxWidth: 250, textOverflow: 'clip', overflow: 'scroll', border: '5px solid white' }}
                                >
                                  {cell.value == "" ? "NA" : cell.value}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div style={{ margin: "20px auto", textAlign: "center" }}>
                 <button onClick={() => exportToCSV(data)} className="download-table-xls-button btn me-2 btn-primary h-excel-btn btn-sm mx-4">Export</button>


                  <select
                    className="mb-4 selectpage border me-1"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    {[10, 25, 50].map((pageSize, idx) => (
                      <option key={idx} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>


                  <span className=""></span>
                  <span className="ms-sm-auto ">
                    <span className="">
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{" "}
                    </span>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {" First "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 my-1"
                      onClick={() => {
                        previousPage();
                      }}
                      disabled={!canPreviousPage}
                    >
                      {" Prev "}
                    </Button>

                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 my-1 nextBtn"
                      onClick={() => {
                        nextPage();
                      }}
                      disabled={!canNextPage}
                    >
                      {" Next "}
                    </Button>
                    <Button
                      variant=""
                      className="btn-default tablebutton me-2 d-sm-inline d-block my-1 lastBtn"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {" Last "}
                    </Button>
                  </span>
                </div>
              </>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReportTable;

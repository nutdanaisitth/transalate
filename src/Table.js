import { useEffect, useRef, useState } from "react";
import { Table, Tabs, Tab } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import { CSVLink, CSVDownload } from "react-csv";
import { Pdf } from "react-to-pdf";

function RenderTabs() {

  let ref = useRef();
  const [key, setKey] = useState("save_draft");
  const Tables = () => {
    const data = {
      columns: [
        {
          label: [
            "ชื่อเอกสาร",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: [
            "ใช้ในงาน/โครงการ",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "position",
          sort: "asc",
          width: 270,
        },
        {
          label: [
            "ค่าใช้จ่าย",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "office",
          sort: "asc",
          width: 200,
        },
        {
          label: [
            "วันที่ต้องการรับเอกสาร",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "age",
          sort: "asc",
          width: 100,
        },
        {
          label: [
            "หัวหน้ารับทราบ",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "date",
          sort: "asc",
          width: 150,
        },
        {
          label: [
            "เจ้าหน้าที่รับทราบ",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "salary",
          sort: "asc",
          width: 100,
        },
        {
          label: [
            "สถานะ",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "age",
          sort: "asc",
          width: 100,
        },
        {
          label: [
            "แก้ไข/ติดตาม",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "date",
          sort: "asc",
          width: 150,
        },
        {
          label: [
            "วันที่บันทึก",
            <i
              key="Lorem"
              className="fa fa-sort ml-3 mt-3 mb-3"
              aria-hidden="true"
            ></i>,
          ],
          field: "salary",
          sort: "asc",
          width: 100,
        },
      ],
      rows: [
        {
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          age: "61",
          date: "2011/04/25",
          salary: "$320",
        },
        {
          name: "Garrett Winters",
          position: "Accountant",
          office: "Tokyo",
          age: "63",
          date: "2011/07/25",
          salary: "$170",
        },
        {
          name: "Ashton Cox",
          position: "Junior Technical Author",
          office: "San Francisco",
          age: "66",
          date: "2009/01/12",
          salary: "$86",
        },
        {
          name: "Cedric Kelly",
          position: "Senior Javascript Developer",
          office: "Edinburgh",
          age: "22",
          date: "2012/03/29",
          salary: "$433",
        },
        {
          name: "Airi Satou",
          position: "Accountant",
          office: "Tokyo",
          age: "33",
          date: "2008/11/28",
          salary: "$162",
        },
        {
          name: "Brielle Williamson",
          position: "Integration Specialist",
          office: "New York",
          age: "61",
          date: "2012/12/02",
          salary: "$372",
        },
        {
          name: "Herrod Chandler",
          position: "Sales Assistant",
          office: "San Francisco",
          age: "59",
          date: "2012/08/06",
          salary: "$137",
        },
        {
          name: "Rhona Davidson",
          position: "Integration Specialist",
          office: "Tokyo",
          age: "55",
          date: "2010/10/14",
          salary: "$327",
        },
        {
          name: "Colleen Hurst",
          position: "Javascript Developer",
          office: "San Francisco",
          age: "39",
          date: "2009/09/15",
          salary: "$205",
        },
        {
          name: "Sonya Frost",
          position: "Software Engineer",
          office: "Edinburgh",
          age: "23",
          date: "2008/12/13",
          salary: "$103",
        },
        {
          name: "Jena Gaines",
          position: "Office Manager",
          office: "London",
          age: "30",
          date: "2008/12/19",
          salary: "$90",
        },
        {
          name: "Quinn Flynn",
          position: "Support Lead",
          office: "Edinburgh",
          age: "22",
          date: "2013/03/03",
          salary: "$342",
        },
        {
          name: "Charde Marshall",
          position: "Regional Director",
          office: "San Francisco",
          age: "36",
          date: "2008/10/16",
          salary: "$470",
        },
        {
          name: "Haley Kennedy",
          position: "Senior Marketing Designer",
          office: "London",
          age: "43",
          date: "2012/12/18",
          salary: "$313",
        },
      ],
    };

    return (
      <div style={{ margin: 32 }}>
        <MDBDataTable
          striped
          bordered
          data={data}
          btn
          paginationLabel={["ก่อนหน้า", "ต่อไป"]}
          noRecordsFoundLabel={"ไม่พบรายการที่ค้นหา"}
          infoLabel={["แสดงรายการค้นหา", "ถึง", "จาก ทั้งหมด", "รายการ"]}
          displayEntries={false}
          noBottomColumns
        />
        <CSVLink data={data.rows}>Download File (.csv)</CSVLink>
        <CSVDownload data={data.rows} target="_blank" />

       
      </div>
    );
  };

  return (
    <div style={{ margin: 32 }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="save_draft" title="บันทึกฉบับร่าง">
          {Tables()}
        </Tab>
        <Tab eventKey="request" title="ร้องขอ">
        </Tab>
        <Tab eventKey="approved" title="อนุมัติ">
        </Tab>
        <Tab eventKey="complete" title="เรียบร้อย">
        </Tab>
        <Tab eventKey="reject" title="ปฏิเสธ">
        </Tab>
        <Tab eventKey="cancel" title="ยกเลิก">
        </Tab>
      </Tabs>
    </div>
  );
}

export default RenderTabs;

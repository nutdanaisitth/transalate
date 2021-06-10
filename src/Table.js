import { useEffect, useRef, useState } from "react";
import { Table, Tabs, Tab, Modal, Button } from "react-bootstrap";
import { MDBBtn, MDBDataTable } from "mdbreact";
import App from "./App";
import { observer, inject } from "mobx-react";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          เพิ่มแบบฟอร์ม
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <App />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const RenderTabs = observer((props) => {
  useEffect(() => {
    handleClose();
  }, [props.AddNewStore.isClose]);

  const [dataRes, setData] = useState([]);
  const [chClick, setStateClick] = useState(false);

  useEffect(() => {
    // storeAccessToken(localStorage.getItem("access_token"));
    axios
      .get("https://api.rihes.cmu.ac.th/api/translate/v1/draft", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MGRmMjQ1YS1hNjFlLTQ2M2QtOGFkNC02OWE5ZGJjODkzNTIiLCJqdGkiOiJhOGJiOTYwNjYyN2I1M2RmMWU2OGUyYjdhMGY5NmNiMzEzOGMxODY5ZjI1MzdhODlhNjYxZWVhOGMzMDRlNDZjMDRmMDBhMGRmNDJlMWRjZSIsImlhdCI6MTYyMjE3NjExOSwibmJmIjoxNjIyMTc2MTE5LCJleHAiOjE2NTM3MTIxMTksInN1YiI6IjUxNiIsInNjb3BlcyI6W119.U0X7o1hnzBGs38DdE55_ant_pvrrKmv5IjBvJmMyRYPG4LEOR6C_UtbmYzPPcSmXODrrZHvndo3_PaR7KJ-o8ZwYe2KlV5VTtW7hhuEHJvHfkG0k6y7AUocRKDoQI65v5-_0XABVhCejR4RhYCd5Hl-zORcx29w97w3Ry7ThOoHDmm286YiCgDB3pkhkuXNlT_P3x7BPqVwP80yK8TdcnSqL6wPwtSJLPNvX34m7e5GYVgk9X1Y0HG-gzAer7h-eqBMnEJJkphmV3W-eSwyra8S5gFD_czO3xVbgBxoYJNiVqRM2ubDyzj6ykmhA0_H0lLS2WGGZZEnpSGafA70ELXNU3hXoefxqLaupR2juBNrW2HLx4Y6lGC9SNHmll-G4DxkPmGrNFrdzN2noOe8jYlX3fUu9hKeHe8G4Q2cybvJajrfKcpEjvch0Iw3WdB9E5Lv6CZqlVdWHHThHEXPgWDzL5mydgb7TVQz4gQGpwsm4Y57w4s-3FclLxJdaOZnyJTAV_FA2GVWPPDZkYfd_dY8FMehpa_YuN2iQCy-JxpyaANMJorTUS_pnD0Mv65ZWRNZEHTZMGZs9-hfRkIs5ElcTwN7vDVd1WKiuicvhw_ab7aCM_MvxDO2lwWRY-ybPn2TRyZYIMP7S2-ZT7uBoIrS3qNoxsWMSTjzxMDonVyk",
          // access_token,
        },
      })
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setData(data);
        // setCreatedAt(moment(data.created_at).format("YYYY-MM-DD"));
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [key, setKey] = useState("save_draft");

  const handleClose = () => {
    props.AddNewStore.clearClose();
    setModalShow(false);
  };

  const handleRowClick = (e) => {
    // document.getElementById("edit-btn").addEventListener("mouseover", alert(e.projName))
    if (chClick) {
      alert(e.projName);
      // setStateClick(false);
    }
  };

  var rows = [];
  var i = 0;
  for (i; i < dataRes.length; i++) {
    rows.push({
      useInProject: dataRes[i].name,
      projName: dataRes[i].project_name,
      price: "-",
      doneAt: dataRes[i].done_at,
      acknowledgeHead: "-",
      acknowledgeStaff: "-",
      status: dataRes[i].status_id.map(({ name }) => name),
      editFollowUp: [
        <div style={{ pointerEvents: "auto" }}>
          <Button
            variant="info"
            size="sm"
            id="edit-btn"
            onMouseOver={() => setStateClick(true)}
            onMouseOut={() => setStateClick(false)}
          >
            <i class="fa fa-pencil mr-1"></i> รายละเอียดแบบฟอร์ม
          </Button>
        </div>,
      ],
      clickEvent: (e) => handleRowClick(e),
      createdAt: moment(dataRes[i].created_at).format("YYYY-MM-DD"),
    });
  }

  const labelHead = (label) => {
    return (
      <div style={{ marginBottom: 4 }}>
        <Button variant="" className="btn-block">
          <b>{label}</b>
          <i key="Lorem" className="fa fa-sort ml-3" aria-hidden="true"></i>
        </Button>
      </div>
    );
  };

  const Tables = () => {
    const data = {
      columns: [
        {
          label: [labelHead("ชื่อเอกสาร")],
          field: "projName",
          sort: "asc",
          width: 150,
        },
        {
          label: [labelHead("ใช้ในงาน/โครงการ")],
          field: "useInProject",
          sort: "asc",
          width: 270,
        },
        {
          label: [labelHead("ค่าใช้จ่าย")],
          field: "price",
          sort: "asc",
          width: 200,
        },
        {
          label: [labelHead("วันที่ต้องรับเอกสาร")],
          field: "doneAt",
          sort: "asc",
          width: 100,
        },
        {
          label: [labelHead("หัวหน้ารับทราบ")],
          field: "acknowledgeHead",
          sort: "asc",
          width: 150,
        },
        {
          label: [labelHead("เจ้าหน้าที่รับทราบ")],
          field: "acknowledgeStaff",
          sort: "asc",
          width: 100,
        },
        {
          label: [labelHead("สถานะ")],
          field: "status",
          sort: "asc",
          width: 100,
        },
        {
          label: [
            <div style={{ marginBottom: 4, pointerEvents: "auto" }}>
              <Button variant="" className="btn-block shadow-none">
                <b>แก้ไข/ติดตาม</b>
              </Button>
            </div>,
          ],
          field: "editFollowUp",
          sort: "asc",
          width: 150,
        },
        {
          label: [labelHead("วันที่บันทึก")],
          field: "createdAt",
          sort: "asc",
          width: 100,
        },
      ],
      rows,
    };

    return (
      <div>
        <MDBDataTable
          responsive
          btn
          striped
          bordered
          data={data}
          paginationLabel={["ก่อนหน้า", "ต่อไป"]}
          noRecordsFoundLabel={"ไม่พบรายการที่ค้นหา"}
          infoLabel={["แสดงรายการค้นหา", "ถึง", "จาก ทั้งหมด", "รายการ"]}
          displayEntries={false}
          noBottomColumns
        />
      </div>
    );
  };

  return (
    <div style={{ margin: "auto" }}>
      <div style={{ marginBottom: 16 }}>
        <Button variant="success" onClick={() => setModalShow(true)}>
          <i class="fa fa-plus mr-2"></i> <b>เพิ่มแบบฟอร์ม</b>
        </Button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="save_draft" title="บันทึกฉบับร่าง">
          {Tables()}
        </Tab>
        <Tab eventKey="request" title="ร้องขอ"></Tab>
        <Tab eventKey="approved" title="อนุมัติ"></Tab>
        <Tab eventKey="complete" title="เรียบร้อย"></Tab>
        <Tab eventKey="reject" title="ปฏิเสธ"></Tab>
        <Tab eventKey="cancel" title="ยกเลิก"></Tab>
      </Tabs>
    </div>
  );
});

export default inject("AddNewStore")(RenderTabs);

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Table, Tabs, Tab, Modal, Button } from "react-bootstrap";
import { MDBBtn, MDBDataTable } from "mdbreact";
import AddNew from "./AddNew";
import { observer, inject } from "mobx-react";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import Edit from "./Edit";
require("moment/locale/th.js");
const useForceUpdate = () => useState()[1];

function AddNewModal(props) {
  return (
    <Modal {...props} size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          เพิ่มแบบฟอร์ม
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddNew />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

function EditModal(props) {
  return (
    <Modal {...props} size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          รายละเอียดแบบฟอร์ม
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Edit />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const RenderTabs = observer((props) => {
  moment.locale("th");
  useEffect(() => {
    handleCloseAddnew();
    handleCloseEdit();
    getStatusId();
    getDraft(statusRequest);
  }, [props.AddNewStore.isClose]);

  const [dataRes, setData] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);
  const [statusId, storeStatusId] = useState([]);
  const [statusRequest, storeStatusRequest] = useState(0);

  const getDraft = (status_id) => {
    axios
      .get(
        "https://api.rihes.cmu.ac.th/api/translate/v1/all/status_id/" +
          status_id,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MGRmMjQ1YS1hNjFlLTQ2M2QtOGFkNC02OWE5ZGJjODkzNTIiLCJqdGkiOiJhOGJiOTYwNjYyN2I1M2RmMWU2OGUyYjdhMGY5NmNiMzEzOGMxODY5ZjI1MzdhODlhNjYxZWVhOGMzMDRlNDZjMDRmMDBhMGRmNDJlMWRjZSIsImlhdCI6MTYyMjE3NjExOSwibmJmIjoxNjIyMTc2MTE5LCJleHAiOjE2NTM3MTIxMTksInN1YiI6IjUxNiIsInNjb3BlcyI6W119.U0X7o1hnzBGs38DdE55_ant_pvrrKmv5IjBvJmMyRYPG4LEOR6C_UtbmYzPPcSmXODrrZHvndo3_PaR7KJ-o8ZwYe2KlV5VTtW7hhuEHJvHfkG0k6y7AUocRKDoQI65v5-_0XABVhCejR4RhYCd5Hl-zORcx29w97w3Ry7ThOoHDmm286YiCgDB3pkhkuXNlT_P3x7BPqVwP80yK8TdcnSqL6wPwtSJLPNvX34m7e5GYVgk9X1Y0HG-gzAer7h-eqBMnEJJkphmV3W-eSwyra8S5gFD_czO3xVbgBxoYJNiVqRM2ubDyzj6ykmhA0_H0lLS2WGGZZEnpSGafA70ELXNU3hXoefxqLaupR2juBNrW2HLx4Y6lGC9SNHmll-G4DxkPmGrNFrdzN2noOe8jYlX3fUu9hKeHe8G4Q2cybvJajrfKcpEjvch0Iw3WdB9E5Lv6CZqlVdWHHThHEXPgWDzL5mydgb7TVQz4gQGpwsm4Y57w4s-3FclLxJdaOZnyJTAV_FA2GVWPPDZkYfd_dY8FMehpa_YuN2iQCy-JxpyaANMJorTUS_pnD0Mv65ZWRNZEHTZMGZs9-hfRkIs5ElcTwN7vDVd1WKiuicvhw_ab7aCM_MvxDO2lwWRY-ybPn2TRyZYIMP7S2-ZT7uBoIrS3qNoxsWMSTjzxMDonVyk",
            // access_token,
          },
        }
      )
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getStatusId = () => {
    axios
      .get("https://api.rihes.cmu.ac.th/api/translate/v1/status_user", {
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
        setDataStatus(data);
        for (i = 0; i < data.length; i++) {
          statusId.push(data[i].id);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const [modalAddNewShow, setAddNewModalShow] = useState(false);
  const [modalEditShow, setEditModalShow] = useState(false);

  const [key, setKey] = useState("save_draft");

  const handleCloseAddnew = () => {
    props.AddNewStore.clearClose();
    setAddNewModalShow(false);
  };

  const handleCloseEdit = () => {
    props.AddNewStore.clearClose();
    setEditModalShow(false);
  };

  const handleRowClick = (e) => {
    var m = moment(e.doneAt, "DD MMMM YYYY", "th");

    if (props.GetDraftStore.onClick) {
      props.GetDraftStore.storeData(
        e.name,
        e.empDep,
        e.projName,
        e.useInProject,
        e.thaiToEng,
        e.engToThai,
        e.composeEng,
        m.locale("en").format("YYYY/MM/DD"),
        e.note,
        e.createdAt,
        e.id,
        e.attachments
      );
      setEditModalShow(true);
    }
  };

  const setEvent = (k) => {
    switch (k) {
      case "save_draft":
        setKey(k);
        getDraft(0);
        storeStatusRequest(0);
        break;
      case "request":
        setKey(k);
        getDraft(1);
        storeStatusRequest(1);
        break;
      case "approved":
        setKey(k);
        getDraft(2);
        storeStatusRequest(2);
        break;
      case "accept":
        setKey(k);
        getDraft(3);
        storeStatusRequest(3);
        break;
      case "complete":
        setKey(k);
        getDraft(4);
        storeStatusRequest(4);
        break;
      case "reject":
        setKey(k);
        getDraft(5);
        storeStatusRequest(5);
        break;
      default:
        break;
    }
  };

  const renderTab = () => {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setEvent(k)}
      >
        {statusId.includes(0) && (
          <Tab eventKey="save_draft" title="บันทึกฉบับร่าง">
            {Tables()}
          </Tab>
        )}

        {statusId.includes(1) && (
          <Tab eventKey="request" title="ส่ง">
            {Tables()}
          </Tab>
        )}
        {statusId.includes(2) && (
          <Tab eventKey="approved" title="อนุมัติ">
            {Tables()}
          </Tab>
        )}
        {statusId.includes(3) && (
          <Tab eventKey="accept" title="รับงานแล้ว">
            {Tables()}
          </Tab>
        )}
        {statusId.includes(4) && (
          <Tab eventKey="complete" title="ส่งงานแล้ว">
            {Tables()}
          </Tab>
        )}
        {statusId.includes(5) && (
          <Tab eventKey="reject" title="ปฏิเสธ">
            {Tables()}
          </Tab>
        )}
      </Tabs>
    );
  };

  var rows = [];
  var i;
  for (i = 0; i < dataRes.length; i++) {
    rows.push({
      id: dataRes[i].id,
      useInProject: dataRes[i].project_name,
      projName: dataRes[i].name,
      price: "-",
      doneAt: moment(new Date(dataRes[i].done_at)).format("LL"),
      acknowledgeHead: "-",
      acknowledgeStaff: "-",
      status: dataRes[i].status_id.map(({ name }) => name),
      editFollowUp: [
        <div style={{ pointerEvents: "auto" }}>
          <Button
            variant="info"
            size="sm"
            id="edit-btn"
            onMouseOver={() => props.GetDraftStore.storeOnClick(true)}
            onMouseOut={() => props.GetDraftStore.storeOnClick(false)}
          >
            <i class="fa fa-eye mr-1"></i> รายละเอียดแบบฟอร์ม
          </Button>
        </div>,
      ],
      clickEvent: (e) => handleRowClick(e),
      createdAt: moment(dataRes[i].created_at).format("LL"),
      thaiToEng: dataRes[i].thai_to_eng_page,
      engToThai: dataRes[i].eng_to_thai_page,
      composeEng: dataRes[i].compose_doc_page,
      note: dataRes[i].note,
      name: dataRes[i].emp_name,
      empDep: dataRes[i].emp_dep,
      attachments: dataRes[i].attachments,
    });
  }

  const labelHead = (lb) => {
    return (
      <div>
        <b>{lb}</b>
        <i
          key="Lorem"
          className="fa fa-sort ml-3 mt-3 mb-3"
          aria-hidden="true"
        ></i>
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
          label: [labelHead("ใช้ในงาน / โครงการ")],
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
          label: [labelHead("แก้ไข / ติดตาม")],
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
        {
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
        }
      </div>
    );
  };

  return (
    <div class="m-3">
      <div class="m-3">
        <div style={{ marginBottom: 16 }}>
          <Button variant="success" onClick={() => setAddNewModalShow(true)}>
            <i class="fa fa-plus mr-2"></i> <b>เพิ่มแบบฟอร์ม</b>
          </Button>
        </div>
        <AddNewModal
          show={modalAddNewShow}
          onHide={() => setAddNewModalShow(false)}
        />
        {modalEditShow && (
          <EditModal show={true} onHide={() => setEditModalShow(false)} />
        )}
        {renderTab()}
      </div>
    </div>
  );
});

export default inject("AddNewStore", "GetDraftStore")(RenderTabs);

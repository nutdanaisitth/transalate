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
    handleCloseEdit()
    getDraft()
  }, [props.AddNewStore.isClose]);

  const [dataRes, setData] = useState([]);

  const getDraft =()=> {
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
  }

  useEffect(() => {
    // storeAccessToken(localStorage.getItem("access_token"));
    getDraft()
  
  }, []);

  const [modalAddNewShow, setAddNewModalShow] = useState(false);
  const [modalEditShow, setEditModalShow] = useState(false);
  const [count, setCount] = useState(0);

  const forceUpdate = useForceUpdate();

  // const forceUpdate = React.useReducer(() => ({}))[1]

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
    forceUpdate();

    var m = moment(e.doneAt, 'DD MMMM YYYY', 'th')

    if (props.GetDraftStore.onClick) {
      props.GetDraftStore.storeData(
        e.name,
        e.empDep,
        e.projName,
        e.useInProject,
        e.thaiToEng,
        e.engToThai,
        e.composeEng,
        m.locale('en').format('YYYY/MM/DD'),
        e.note,
        e.createdAt,
        e.id
      );
      setEditModalShow(true);

      // props.GetDraftStore.storeTest(e.projName)
    }
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
    <div style={{ margin: "auto" }}>
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
      </Tabs>
    </div>
  );
});

export default inject("AddNewStore", "GetDraftStore")(RenderTabs);

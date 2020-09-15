import React, { useState } from "react"
import { Button, Modal, Form, Descriptions } from "antd"
import axios from 'axios'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

//添加比赛的弹出框
const CollectionCreateForm = ({ visible, onCreate, onCancel,time,detail }) => {
  const [form] = Form.useForm()
  // var time = props.time
  // var detail = props.detail
  console.log("time:",time,"detail:",detail)
  return (
    <Modal
      visible={visible}
      width= "800px"
      title="举报详情"
      okText="解决举报"
      cancelText="返回"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log("Validate Failed:", info)
          })
      }}
    >
      <Descriptions title="举报详情" bordered>         
        <Descriptions.Item label="时间">{time}</Descriptions.Item>
        <Descriptions.Item label="详细描述">{detail}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

//调用按钮
const ReportDetail = (props) => {

  // console.log("chuli:",props.id)

  
  const [time, setTime] = useState()
  const [detail, setDetail] = useState()
  axios
  .get(`http://mock-api.com/ZgBbVmgB.mock/api/Report/[${props.id}]`)
  .then((res) => {
    console.log('res1:', res.data)
    setTime(res.data.Time) 
    setDetail(res.data.Content) 
  })
  .catch(function (error) {
    console.log(error)
  })

  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    //处理数据
    axios.put('/api/Report?status=successful').then(res => {
      console.log(res);
    })
    setVisible(false)
  }

  return (
    <div>
      <Button
        type="default"
        onClick={() => {
          setVisible(true)
        }}
      >
        处理
      </Button>
      <CollectionCreateForm
        time={time}
        detail={detail}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default ReportDetail

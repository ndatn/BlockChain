import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const CustomModal = (props) => {
  return (
    <Modal isOpen={props?.isOpen} onClose={props?.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Transaction alert</ModalHeader>
            <ModalBody>
                <Text>Transaction has been saved at <Text fontWeight={"bold"}>{props?.blockHash}</Text></Text>
                <Text>From: <Text fontWeight={"bold"}>{props?.from}</Text></Text>
                <Text>To: <Text fontWeight={"bold"}>{props?.to}</Text></Text>
                {props?.blockNumber && <Text display={"flex"}>Amount: <Text fontWeight={"bold"}>{props?.blockNumber}</Text><FaEthereum style={{ marginTop: "4px" }}/></Text>}
                {props?.createdDate && <Text>Created Date: {props?.createdDate}</Text>}
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CustomModal
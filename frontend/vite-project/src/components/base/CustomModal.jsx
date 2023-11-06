import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

const CustomModal = (props) => {
  return (
    <Modal isOpen={props?.isOpen} onClose={props?.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Transaction alert</ModalHeader>
            <ModalBody>
                <Text>Transaction has been saved at {props?.blockHash}</Text>
                <Text>From: {props?.from}</Text>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CustomModal
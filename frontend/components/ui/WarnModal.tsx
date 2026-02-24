import { Button, Modal, ModalBody, ModalContent, Spinner } from "@heroui/react";

interface IWarnModal {
  sizes: "sm" | "md" | "lg";
  colour: string;
  defaultColour: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  additionalClassName?: string;
  btnClose: () => void;
  btnFn: () => void;
  btnText: string;
  onVisible: boolean;
  onPending: boolean;
}

const WarnModal: React.FC<IWarnModal> = (props) => {
  
  const { 
    onVisible, 
    btnClose, 
    btnFn, 
    sizes,
    colour,
    defaultColour,
    btnText,
    onPending 
  } = props;

  return (
    <section>
      <Modal
        backdrop="opaque"
        isOpen={onVisible}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onClose={() => btnClose()}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="">
                <section className="p-8">
                  <div className="p-6">
                    <h1 className="text-center text-md">
                      {btnText}
                    </h1>
                  </div>
                  <div className="mt-2 flex justify-center gap-4">
                    <Button 
                      size={sizes} 
                      onPress={() => onClose()}
                      variant="flat"
                      // className={`bg-${colour}-500 text-white`}
                      color={defaultColour}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size={sizes} 
                      className={`bg-${colour}-500 text-white`} 
                      onPress={() => {
                        btnFn()
                      }}
                    >
                      {onPending ? (
                        <Spinner color="white" size="sm"/>
                      ) : "Delete"}
                    </Button>
                  </div>
                </section>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default WarnModal;

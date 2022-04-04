import React, { useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import { Button, Grid, Header, Icon, Modal } from "semantic-ui-react";

export default function CropImageModal({
  mediaPreview,
  setMediaPreview,
  setMedia,
  showModal,
  setShowModal,
}) {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (cropper) {
      setMedia(cropper.getCroppedCanvas().toDataURL());
      setMediaPreview(cropper.getCroppedCanvas().toDataURL());
      cropper.destroy();
    }

    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (cropper) {
        switch (key) {
          case "m":
            cropper.setDragMode("move");
            break;
          case "c":
            cropper.setDragMode("crop");
            break;
          case "r":
            cropper.reset();
            break;

          default:
            break;
        }
      }
    });
  }, [cropper]);

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        size="large"
        onClose={() => setShowModal(false)}
        open={showModal}
      >
        <Modal.Header content="Crop image before upload" />
        <Grid columns={2}>
          <Grid.Column>
            <Modal.Content image>
              <Cropper
                style={{ height: "400px", width: "100%" }}
                cropBoxResizable
                zoomable
                highlight
                responsive
                guides
                dragMode="move"
                initialAspectRatio={1}
                preview=".img-preview"
                src={mediaPreview}
                viewMode={1}
                minContainerHeight={10}
                minContainerWidth={10}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(cropper) => setCropper(cropper)}
              />
            </Modal.Content>
          </Grid.Column>
          <Grid.Column>
            <Modal.Content image>
              <div>
                <Header as="h2">
                  <Icon name="file image outline" />
                  <Header.Content content="Final" />
                </Header>
                <div>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      display: "inline-block",
                      padding: "10px",
                      overflow: "hidden",
                      boxSizing: "border-box",
                    }}
                    className="img-preview"
                  />
                </div>
              </div>
            </Modal.Content>
          </Grid.Column>
        </Grid>
        <Modal.Actions>
          <Button
            title="Reset (R)"
            icon="redo"
            circular
            onClick={() => cropper && cropper.reset()}
          />
          <Button
            title="Move Canvas (M)"
            icon="move"
            circular
            onClick={() => cropper && cropper.setDragMode("move")}
          />
          <Button
            title="New Cropbox (C)"
            icon="crop"
            circular
            onClick={() => cropper && cropper.setDragMode("crop")}
          />
          <Button
            negative
            content="Cancel"
            icon="cancel"
            onClick={() => setShowModal(false)}
          />
          <Button
            positive
            content="Crop image"
            icon="checkmark"
            onClick={getCropData}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

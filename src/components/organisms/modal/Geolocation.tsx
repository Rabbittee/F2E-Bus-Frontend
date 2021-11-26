import { FormEvent, useState } from "react";
import { Icon, Button, Modal, Glassmorphism } from "@/components";
import { Geo, useDispatch, User, useSelector } from "@/logic";

export function Geolocation() {
  const [open, setOpen] = useState(!useSelector(User.selectHasAskedGeo));
  const dispatch = useDispatch();

  function onConfirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(Geo.fetch())
      .then(() => dispatch(User.enableGeo(true)))
      .catch(console.error)
      .finally(onClose);
  }

  const onCancel = () =>
    Promise.resolve()
      .then(() => dispatch(User.enableGeo(false)))
      .then(() => onClose());

  const onClose = () => setOpen(false);

  if (!open) return <></>;

  return (
    <Modal
      onClick={onClose}
      background={
        <Glassmorphism
          className="brightness-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      }
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <form
        onSubmit={onConfirm}
        onReset={onCancel}
        className="space-y-4 md:space-y-6"
      >
        <div className="flex flex-col items-center md:gap-2">
          <Icon.LocationActive className="w-9" />

          <strong className="text-dark-green text-lg">
            是否允許網站存取您目前的位置?
          </strong>

          <span className="text-gray-400">為了更好的協助您...</span>
        </div>

        <footer className="flex justify-between gap-4 text-blue">
          <Button variant="blue-outlined">
            <button type="reset" className="flex-1">
              拒絕
            </button>
          </Button>

          <Button variant="blue-contained">
            <button type="submit" className="flex-1">
              接受
            </button>
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

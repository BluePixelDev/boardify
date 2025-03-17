import "../fildedropStyles.css";
import DialogContainer from "@/shared/dialog/DialogContainer";

export default function FileDropDialog() {
    return (
        <DialogContainer>
            <div className="file-drop-dialog">
                <h1>Upload here!</h1>
                {/* You can add more content here */}
            </div>
        </DialogContainer>
    );
}

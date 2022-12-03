import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


type EmojiMartPickerProps = {
    addEmoji: (emoji:any) => void
}

const EmojiMartPicker: React.FC<EmojiMartPickerProps> = ({ addEmoji }) => {
	return (
		<Picker
			set='facebook'
			title='Pick your emoji…'
			emoji='point_up'
			onSelect={addEmoji}
		/>
	);
};

export default EmojiMartPicker;

export type LINEBody = {
  messages: Message[];
};

type Message = {
  type:
    | 'text'
    | 'image'
    | 'video'
    | 'audio'
    | 'file'
    | 'location'
    | 'sticker'
    | 'imagemap'
    | 'template'
    | 'flex';
  text: string;
};

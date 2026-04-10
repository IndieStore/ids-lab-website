import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  content: any
}

export default function RichTextRenderer({ content }: Props) {
  return <RichText data={content} />
}

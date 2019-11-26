import styled from 'styled-components'

export const Post = styled.View`
  margin-top: 10px;

`
export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`
export const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 16px;
  margin-right: 10px;
`
export const Name = styled.Text`
  color: #333;
  font-weight: bold;
`
export const PostImage = styled.Image`
width: 100%;
  aspect-ratio: 0.836
`

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;

`

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#f00'
}) `
  margin: 30px 0;
`
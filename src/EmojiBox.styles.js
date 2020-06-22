import styled from '@emotion/styled'

export const UlCustom = styled.ul`
    margin: 1px auto;
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: center;
    width: 150px;
    border: 1px #80808059 solid;
    background-color: rgba(229, 233, 234, 0.57);`

export const CardContainer = styled.div`
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
`
export const CardChildren = styled.div`
    width: 18rem;
    max-width: 23%;
    margin: 5px;
`
export const ContainerCustom = styled.div`
    position: absolute;
    bottom: 5px;
    min-height: 70px;
    left: 50%;
    transform: translateX(-50%);`

export const DEFAULT_EMOJI = '\u{1f9d9}';
export const EMOJI_ARRAY = ['\u{1f604}', '\u{1f929}', '\u{1f621}', '\u{1f47b}', '\u{1f47e}'];
////https://unicode.org/emoji/charts/full-emoji-list.html
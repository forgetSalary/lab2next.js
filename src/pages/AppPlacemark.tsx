import { Placemark } from "@pbe/react-yandex-maps"


export type AppPlacemarkProps = {
    coordinates: number[],
    balloonText: string
}

export const AppPlacemark = (props: AppPlacemarkProps) => {
    const {coordinates, balloonText} = props; 
    return (
        <Placemark 
            geometry={
                coordinates
            }
            properties={{
                balloonContent: `
                <div>${balloonText}</div>`,
            }}
            modules={[
                'geoObject.addon.balloon',
            ]}
    />)
}
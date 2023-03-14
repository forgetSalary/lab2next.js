import { Placemark } from "@pbe/react-yandex-maps"


export type AppPlacemarkProps = {
    id: number,
    coordinates: number[],
    balloonText: string
}

export const AppPlacemark = (props: AppPlacemarkProps) => {
    const {id ,coordinates, balloonText} = props; 
    return (
        <Placemark 
            id = {id}

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
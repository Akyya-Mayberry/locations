// Code prevents constant error message no 'react-google-maps' found

declare module "react-google-maps" {
    export var GoogleMap: GoogleMap;
}

interface GoogleMap {
    (any): any;
}

import makeFixtureImage from './make-fixture-image';
import makeLabelImage from './make-label-image';

const backgroundImage = [...makeFixtureImage(), ...makeLabelImage()] as const;

export default backgroundImage;

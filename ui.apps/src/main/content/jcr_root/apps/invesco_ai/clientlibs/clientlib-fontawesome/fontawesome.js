import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

// Add the specific icon to the library
library.add(faCamera);

// Create an icon element to render
const cameraIcon = icon({ prefix: 'fas', iconName: 'camera' });

// Example of how you might append it to a specific element by ID
document.getElementById('icon-container').appendChild(cameraIcon.node[0]);

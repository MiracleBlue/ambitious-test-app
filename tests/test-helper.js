import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import chai from 'chai';
//import SinonChai from 'npm:sinon-chai';

//chai.use(SinonChai);

setResolver(resolver);

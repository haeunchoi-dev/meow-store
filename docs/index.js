import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import Swagger from '../handler/swagger';

import admin from '../docs/api/admin';
import member from '../docs/api/member';
import user from '../docs/api/user';
import products from '../docs/api/products';
import product from '../docs/api/product';

class ApiDocs {
  #apiDocOption;
  #swagger;

  constructor() {
    this.#apiDocOption = {
      ...admin,
      ...member,
      ...user,
      ...products,
      ...product,
      //...categorys,
    };

    this.#swagger = new Swagger();
  }

  init() {
    this.#swagger.addAPI(this.#apiDocOption);
  }

  getSwaggerOption() {
    const { apiOption, setUpoption } = this.#swagger.getOption();

    const specs = swaggerJsDoc(apiOption);

    return {
      swaggerUI,
      specs,
      setUpoption,
    };
  }
}

export default ApiDocs;

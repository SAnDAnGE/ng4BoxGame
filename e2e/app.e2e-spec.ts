import { Ng4BoxGamePage } from './app.po';

describe('ng4-box-game App', () => {
  let page: Ng4BoxGamePage;

  beforeEach(() => {
    page = new Ng4BoxGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

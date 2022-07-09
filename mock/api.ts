export default {
  'GET /user': { name: 'SamLaw' },
  'POST /user/login': (req: any, res: any) => {
    console.log(req.body, 'req');
    const { username, password } = req.body;
    if (username && password && username === 'samLaw' && password === '123') {
      res.send({ code: 1 });
    } else {
      res.send({ code: 0 });
    }
  },
};

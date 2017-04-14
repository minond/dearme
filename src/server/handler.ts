import { Request, Response } from '../application';
import { user } from '../repository/user';

export function handler_serve_index(req: Request, res: Response): void {
    res.render('index');
}

export function handler_save_user(req: Request, res: Response): void {
    user.save({
        phone: req.body.phone,
        handle: req.body.handle,
    }).then(() => {
        res.status(200);
        res.json({ ok: true });
    }).catch(() => {
        res.status(500);
        res.json({ ok: false });
    });
}

import { VercelRequest, VercelResponse } from '@vercel/node';
import * as jwt from 'jsonwebtoken';
import fetch from 'node-fetch-commonjs';
import { Octokit } from 'octokit';

export default async function (req: VercelRequest, res: VercelResponse) {
    const {
        PRIVATE_KEY,
        APP_ID,
    } = ((): {PRIVATE_KEY: string, APP_ID: string} => {
        const { PRIVATE_KEY, APP_ID } = process.env;
        if(!PRIVATE_KEY) {
            throw new Error('PRIVATE_KEY is required');
        }
        if(!APP_ID) {
            throw new Error('APP_ID is required');
        }
        return { PRIVATE_KEY, APP_ID };
    })()


    const payload = {
        iat: new Date().getTime() - 60 * 1000, // issued at time, 60 seconds in the past to allow for clock drift
        exp: new Date().getTime() + 60 * 1000 * 5, // expires at time, 300 seconds in the future
        iss: APP_ID // issuer, the app id
    }

    const encoded = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
    const url = "https://api.github.com/app"
    const token = await fetch(url, {
        headers: {
            Authorization: `Bearer ${encoded}`,
            Accept: "application/vnd.ghub.v3+json",
        }
    }).then(res => res.json()).then(res => (res as unknown as { token: string}).token);

    const octokit = new Octokit({
        auth: token,
    });
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: 'akadori',
        repo: "deploy_serverless_functions_to_vercel",
        title: "test",
        body: "test",
    });
    res.status(200).send("OK");
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   script.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: momihamm <momihamm@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/11/07 14:24:22 by momihamm          #+#    #+#             */
/*   Updated: 2024/11/18 15:26:19 by momihamm         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let speedkmi = 10;
let percentSpeedY = 0;
let percentSpeedX = 0;
let paddle3ard = 0; // 3ard dyal paddle
let ballY = 682; //682
let ballX = 424; //424
let zawiya = 0;
let dirction_sidi_moumen = 0;

function downBall(kora, sor3aX, sor3aY, ballYPercent, ballXPercent)
{
    ballYPercent += sor3aY;
    ballXPercent += sor3aX;
    kora.style.top = `${ballYPercent}%`;
    kora.style.left = `${ballXPercent}%`;
    return [ballXPercent, ballYPercent];
}

// function tasadomX(ballXPercent, paddleXPercent, ard_paddle, ard_ball)
// {
//     let seven = (ard_ball / 4) * 3;
//     if (ballXPercent >= paddleXPercent && (ballXPercent + ard_ball) <= (paddleXPercent + ard_paddle))
//         {
//             console.log(" in range");
//             return (true);
//         }
//     if (ballXPercent >= paddleXPercent && (ballXPercent + seven) <= (paddleXPercent + ard_paddle))
//     {
//         console.log("kmi")
//         return (true);
//     }
//     return (false);
// }

function tasadomX(ballXPercent, paddleXPercent, ard_paddle, ard_ball)
{
    let seven = (ard_ball / 2) - 2;
    let flag = false;
    // if (ballXPercent >= paddleXPercent && (ballXPercent + ard_ball) <= (paddleXPercent + ard_paddle))
    //     {
    //         console.log(" in range");
    //         return (true);
    //     }
    if (ballXPercent >= paddleXPercent)
    {
        // console.log(" X dakhel");
        flag = true;
    
        // console.log("kora ", ballXPercent + seven ,  "PADDLE ", paddleXPercent + ard_paddle);
        if ((ballXPercent + seven) <= (paddleXPercent + ard_paddle))
        {
            console.log("kmi")
            if (flag == true)
                return (true);
        }
    }
    else if (ballXPercent <= paddleXPercent)
    {
        if ((ballXPercent + ard_ball) - 1 >= paddleXPercent)
            return (true);
    }
    return (false);
}

function tasadomWhitTOPPaddle(ballYPercent , paddleYPercent)
{
    // console.log ("B  ", ballYPercent, " P ", paddleYPercent);
    if (ballYPercent <= paddleYPercent)
        {
            // console.log("is ikchem ************************");
            return (true);
        }
        return(false); 
}

function tasadomWhitPaddle(ballYPercent , paddleYPercent)
{
    // console.log ("B  ", ballYPercent, " P ", paddleYPercent);
    if (ballYPercent >= paddleYPercent)
    {
        // console.log("upper");
        return (true);
    }
    return(false);   
}

function leftRight(paddlePosition, Xball)
{
    if (Xball <= (paddlePosition + (paddle3ard / 2)))
        return (true);
    return(false);
}

function gameLoop() {
    const topPaddle = document.querySelector('.topPaddle');
    const botmPaddle = document.querySelector('.botmPaddle');
    const gameContainer = document.querySelector('.game');
    const ball = document.querySelector('.ball');
    const keysPressed = {};
    const moveDistance = 0.1;
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const maxLeft = 0;
    const maxRight = 100 - (topPaddle.clientWidth / containerWidth) * 100;
    let ballYPercent = 50;
    let ballXPercent = 50;
    let speedra = (speedkmi / containerHeight) * 100;
    percentSpeedY = (speedkmi / containerHeight) * 100;
    percentSpeedX = (speedkmi / containerWidth) * 100;
    let ballHeight = (ball.clientHeight / containerHeight) * 100;
    let ballWidth = (ball.clientWidth / containerHeight) * 100;
    let ballXY =[ballXPercent, ballYPercent];
    paddle3ard = (botmPaddle.clientWidth / gameContainer.clientWidth) * 100;
    paddleHirtifa3 = (botmPaddle.clientHeight / gameContainer.clientHeight) * 100;
    let paddleBotY = (botmPaddle.offsetTop / containerHeight) * 100;
    let paddleTopY = ((topPaddle.offsetTop + paddleHirtifa3) / containerHeight) * 100;

    // ############# ADDING THE ANGLE ##################
    let no9taTasadomX;
    let no9taTasadomY;

    
    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;//press
    });
    document.addEventListener('keyup', (event) => {
        keysPressed[event.key] = false;//reales
    });

    function updatePaddlePosition() {
        let topPaddleLeft = (topPaddle.offsetLeft / containerWidth) * 100;
        let botmPaddleLeft = ((botmPaddle.offsetLeft) / containerWidth) *100;

        if (keysPressed['a'] || keysPressed['A']) {
            topPaddleLeft = Math.max(maxLeft, topPaddleLeft - moveDistance);
        }
        if (keysPressed['d'] || keysPressed['D']) {
            topPaddleLeft = Math.min(maxRight, topPaddleLeft + moveDistance);
        }
        if (keysPressed['ArrowLeft']) {
            botmPaddleLeft = Math.max(maxLeft, botmPaddleLeft - moveDistance);
        }
        if (keysPressed['ArrowRight']) {
            botmPaddleLeft = Math.min(maxRight, botmPaddleLeft + moveDistance);
        }
        topPaddle.style.left = topPaddleLeft + '%';
        botmPaddle.style.left = botmPaddleLeft + '%';
        ballXY = downBall(ball, percentSpeedX, percentSpeedY, ballXY[1], ballXY[0]);
        if (ballXY)
        {
            if ((ballXY[1] + ballHeight) >= 100 || ballXY[1] <= 0)
            {
                ballXY[1] = 50;
                ballXY[0] = 50;
                percentSpeedY *= -1;
                percentSpeedX = 0;
            }
            if ((ballXY[1] + ballHeight) <= 100 || ballXY[1] >= 0)
            {
                if (tasadomWhitPaddle(ballXY[1] + ballHeight, paddleBotY) == true && tasadomX(ballXY[0], botmPaddleLeft, paddle3ard, ballWidth) == true)
                {
                    no9taTasadomX = ballXY[0] - (botmPaddleLeft + (paddle3ard / 2));
                    no9taTasadomX /= (paddle3ard / 2);
                    zawiya = no9taTasadomX * (Math.PI / 4);
                    if (ballXY[1] > (containerHeight / 2))
                        dirction_sidi_moumen = 1;
                    else
                        dirction_sidi_moumen = -1;
                    percentSpeedY = dirction_sidi_moumen * speedra * Math.cos(zawiya);
                    percentSpeedX = speedra * Math.sin(zawiya);
                }
                if (tasadomWhitTOPPaddle(ballXY[1] - paddleHirtifa3, paddleTopY) == true && tasadomX(ballXY[0], topPaddleLeft, paddle3ard, ballWidth) == true)
                {
                    percentSpeedY *= -1;
                }
            }
            if ((ballXY[0] + ballWidth) >= 100 || ballXY[0] <= 0)
            {
                percentSpeedX *= -1;
            }
        }
        ballXY = downBall(ball, percentSpeedX, percentSpeedY,ballXY[1], ballXY[0]);
        if (ballXY)
        {
            if ((ballXY[1] + ballHeight) >= 100 || ballXY[1] <= 0)
            {
                ballXY[1] = 50;
                ballXY[0] = 50;
                percentSpeedY *= -1;
                percentSpeedX = 0;
            }
            if ((ballXY[1] + ballHeight) <= 100 || ballXY[1] >= 0)
            {
                if (tasadomWhitPaddle(ballXY[1] + ballHeight, paddleBotY) == true && tasadomX(ballXY[0], botmPaddleLeft, paddle3ard, ballWidth) == true)
                {
                    no9taTasadomX = ballXY[0] - (botmPaddleLeft + (paddle3ard / 2));
                    no9taTasadomX /= (paddle3ard / 2);
                    zawiya = no9taTasadomX * (Math.PI / 4);
                    if (ballXY[1] > (containerHeight / 2))
                        dirction_sidi_moumen = 1;
                    else
                        dirction_sidi_moumen = -1;
                    percentSpeedY = dirction_sidi_moumen * speedra * Math.cos(zawiya);
                    percentSpeedX = speedra * Math.sin(zawiya);
                }
                if (tasadomWhitTOPPaddle(ballXY[1] - paddleHirtifa3, paddleTopY) == true && tasadomX(ballXY[0], topPaddleLeft, paddle3ard, ballWidth) == true)
                {
                    percentSpeedY *= -1;
                }
            }
            if ((ballXY[0] + ballWidth) >= 100 || ballXY[0] <= 0)
            {
                percentSpeedX *= -1;
            }
        }
        requestAnimationFrame(updatePaddlePosition);
    }
    requestAnimationFrame(updatePaddlePosition);

    
}
gameLoop();

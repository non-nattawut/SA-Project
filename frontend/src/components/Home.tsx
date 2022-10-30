import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";

function Home(){
    return(
        <Box>
            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบหลัก : ระบบจัดการคนไข้นอก </h2>
                        </Grid>
                        <Grid marginBottom={2}>
                            ระบบจัดการคนไข้นอกเป็นระบบที่ให้ผู้ใช้ระบบซึ่งเป็นแพทย์หรือพยาบาลสามารถเข้าสู่ระบบ เพื่อบันทึก
                            ประวัติผู้ป่วยเก็บข้อมูลการวินิจฉัยอาการ จากนั้นก็จะมีการสั่งจ่ายยาจากแพทย์และหากมีการนัดแพทย์จะ
                            สามารถทำการบันทึกใบนัดลงในระบบได้และแคชเชียร์สามารถเข้าสู่ระบบเพื่อทำการออกบิลชำระค่าบริการให้กับ
                            ผู้ป่วยได้
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบบันทึกข้อมูลบุคลากร </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                            นอกจากนี้ยังมีระบบบันทึกข้อมูลบุคลากรโดยมีผู้ใช้ซึ่ง เป็นผู้ดูแลระบบสามารถทำการเข้าสู่ระบบโดย
                            สามารถบันทึกข้อมูลแพทย์และพยาบาลได้เช่นข้อมูลเลขบัตรประจำตัวประชาชน เพศ ตำแหน่ง แผนก กรุ๊ป
                            เลือด เป็นต้น เพื่อเป็นข้อมูลเบื้องหลังเพื่อใช้ในการเข้าสู่ระบบของโรงพยาบาลและผู้ดูแลระบบสามารถดูข้อมูลของบุคลากรทั้งหมดได้
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบบันทึกข้อมูลบุคลากร)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> ผู้ดูแลระบบ
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบเก็บบันทึกข้อมูลของบุคลากร
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> เป็นข้อมูลเบื้องหลังให้บุคลากรสามารถเข้าใช้งานระบบของโรงพยาบาลได้และมีประวัติข้อมูลของบุคลากรที่ผู้
                                ดูแลระบบสามารถดูและจัดการได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบประวัติผู้ป่วย </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                            ระบบประวัติผู้ป่วย เป็นระบบที่จะทำการลงทะเบียนผู้ป่วย โดยพยาบาลจะทำการเก็บประวัติผู้ป่วย
                            กรุ๊ปเลือด และสิทธิการรักษาลงในฐานข้อมูลของระบบ
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบประวัติผู้ป่วย)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> พยาบาล
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบบันทึกข้อมูลของผู้ป่วย
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้สามารถบันทึก เรียกดู และแก้ไขข้อมูลของคนไข้นอกได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบเก็บข้อมูลการวินิจฉัย </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                            ระบบเก็บข้อมูลการวินิจฉัยจะมีผู้ใช้ระบบซึ่งเป็นแพทย์เป็นผู้ใช้งาน แพทย์จะทำการวินิจฉัยอาการ
                            โดยใช้วิธีการวินิจฉัยต่าง ๆ รวมถึงสรุปโรคที่ตรวจพบจากการวินิจฉัย จากนั้นจะทำการกรอกข้อมูลนี้ของของ
                            ผู้ป่วยแต่ละคน เข้าไปยังระบบ
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบเก็บข้อมูลการวินิจฉัย)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> แพทย์
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> เก็บข้อมูลการวินิจฉัย ได้แก่อาการ วิธีการวินิจฉัย และโรคของคนไข้แต่ละคน หลังจากวินิจฉัย
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันสามารถบันทึกข้อมูลการวินิจฉัย ของคนไข้ได
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบบันทึกการสั่งจ่ายยา </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                            โดยระบบสั่งจ่ายยาจะเป็นระบบที่ให้ผู้ใช้ระบบซึ่งเป็นแพทย์สามารถ login เข้าระบบเพื่อทำบันทึกข้อมูล
                            การสั่งจ่ายยาที่ห้องยาจะต้องจ่ายยาให้กับคนไข้นอก โดยมีการดึงข้อมูลยาออกมาจากฐานข้อมูลเพื่อให้แพทย์เลือก
                            ตัวยาที่ต้องการสั่งจ่ายได
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบบันทึกการสั่งจ่ายยา)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> แพทย์
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบสามารถบันทึกข้อมูลยาให้กับคนไข้นอกที่เข้ารับการรักษา
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันสามารถสั่งจ่ายยาให้กับคนไข้นอกได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบใบนัด </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                            โดยระบบใบนัดจะเป็นระบบที่ให้ผู้ใช้ระบบที่เป็นแพทย์ใส่ข้อมูลการนัดผู้ป่วยนอก โดยมีการดึงข้อมูล
                            เกี่ยวกับประวัติผู้ป่วยเพื่อที่จะระบุตัวตนผู้ป่วยนอก
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบใบนัด)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> แพทย์
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบสามารถบันทึกข้อมูลเกี่ยวกับการใส่ข้อมูลการนัดของแพทย์กับคนไข้นอก
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้แพทย์สามารถนัดกับคนไข้ได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย :  ระบบออกบิลชำระค่าบริการ </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                            โดยระบบออกบิลชำระค่าบริการ ผู้ใช้งานคือแคชเชียร์จะทำการออกบิลค่าบริการให้แก่ผู้ป่วยและ
                            สามารถเลือกได้ว่าผู้ป่วยต้องการชำระเงินแบบใด โดยในบิลจะมีข้อมูลการชำระค่าบริการจะบอกเป็นวันที่ 
                            เลขการสั่งยา เลขการวินิจฉัย ผลรวมค่าบริการ ใครคือผู้ออกบิลค่าบริการนี้ และบันทึกข้อมูลการออกบิล
                            ค่าบริการลงระบบ
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบบันทึกการออกบิลชำระค่าบริการ)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> แคชเชียร์
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบสามารถบันทึกการออกบิลชำระค่าบริการได้
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันสามารถออกบิลชำระค่าบริการได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Home;